import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { auth, db, storage } from '../../../lib/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { UserPlus, Upload, Sparkles, User, Mail, Lock, CreditCard } from 'lucide-react';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      let avatarUrl = '';
      if (profileImage) {
        // Upload profile image to Firebase Storage
        const imageRef = ref(storage, `avatars/${user.uid}`);
        await uploadString(imageRef, profileImage, 'data_url');
        avatarUrl = await getDownloadURL(imageRef);
      } else {
        avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`;
      }

      // Save user to Firestore with 'pending' status
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        avatar: avatarUrl,
        status: 'pending',
        joinedDate: new Date().toISOString().split('T')[0],
        room: '', // To be updated later or by admin
      });

      // Sign out immediately so they can't access dashboard until approved
      await signOut(auth);

      alert('Registration successful! Your account is pending admin approval.');
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="backdrop-blur-2xl bg-white/5 rounded-3xl shadow-2xl p-8 border border-white/10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 p-5"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <img src={logo} alt="CDS Logo" className="w-full h-full object-contain" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-white/60">Join Convergence Digital Society</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            {/* Profile Image Upload */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative group">
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden border-4 border-purple-500/30 shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-white/40 group-hover:text-white/60 transition-colors" size={40} />
                  )}
                </motion.div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full cursor-pointer hover:shadow-xl hover:shadow-purple-500/50 transition-all"
                >
                  <Upload size={18} />
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-white/80 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="text-white/40" size={20} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>
                <p className="text-xs text-white/40 mt-1.5">Cannot be edited later</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <label htmlFor="studentId" className="block text-sm font-semibold text-white/80 mb-2">
                  Student ID <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CreditCard className="text-white/40" size={20} />
                  </div>
                  <input
                    id="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g., 2021001234"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-white/80 mb-2">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-white/40" size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <label htmlFor="password" className="block text-sm font-semibold text-white/80 mb-2">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-white/40" size={20} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white/80 mb-2">
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-white/40" size={20} />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </motion.div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <UserPlus size={22} />
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-sm text-white/60">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-sm text-white/40 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Convergence Digital Society © 2026
        </motion.p>
      </motion.div>
    </div>
  );
}