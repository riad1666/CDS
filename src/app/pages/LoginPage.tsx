import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { auth, db } from '../../../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { LogIn, Sparkles, Lock, User } from 'lucide-react';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // We assume loginId is an email for Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, loginId, password);
      const user = userCredential.user;

      // Check user approval status in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.status === 'pending') {
          await signOut(auth);
          setError('Your account is still pending admin approval.');
          setLoading(false);
          return;
        } else if (userData.status === 'rejected') {
          await signOut(auth);
          setError('Your account has been rejected by the admin.');
          setLoading(false);
          return;
        }
      }

      // Complete login logic - could add admin check here based on userData.role
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
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
        className="w-full max-w-md relative z-10"
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
              Welcome Back
            </h1>
            <p className="text-white/60">Sign in to continue to CDS</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="loginId" className="block text-sm font-semibold text-white/80 mb-2">
                Login ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-white/40" size={20} />
                </div>
                <input
                  id="loginId"
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Email / Student ID / Username"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-white/40" size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <LogIn size={22} />
              {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowForgotPassword(!showForgotPassword)}
              className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Password?
            </motion.button>

            {showForgotPassword && (
              <motion.div
                className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="font-semibold text-blue-300 mb-2">Contact Admin</p>
                <a
                  href="mailto:mdriadmollik@icloud.com"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  mdriadmollik@icloud.com
                </a>
              </motion.div>
            )}

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/60">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
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