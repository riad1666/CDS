import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, ShoppingCart, Upload, X, Image as ImageIcon, Calendar, User } from 'lucide-react';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

interface ShoppingItem {
  id: number;
  title: string;
  amount: number;
  date: string;
  images: string[];
  addedBy: string;
}

export function ShoppingPage() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const shoppingItems: ShoppingItem[] = [
    {
      id: 1,
      title: 'Weekly Grocery Shopping',
      amount: 85000,
      date: '2026-03-20',
      images: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
      ],
      addedBy: 'John Doe',
    },
    {
      id: 2,
      title: 'Cleaning Supplies',
      amount: 25000,
      date: '2026-03-18',
      images: ['https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400'],
      addedBy: 'Sarah Lee',
    },
    {
      id: 3,
      title: 'Kitchen Utensils',
      amount: 45000,
      date: '2026-03-15',
      images: [
        'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400',
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
      ],
      addedBy: 'Imran Ahmed',
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setUploadedImages([...uploadedImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    setFormData({ title: '', amount: '' });
    setUploadedImages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={24} />
              </motion.button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="text-indigo-400" size={22} />
                </div>
                <h1 className="font-bold text-xl text-white">Shopping</h1>
              </div>
            </div>

            <motion.button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Add Shopping
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shopping List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shoppingItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 shadow-xl hover:shadow-2xl transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Images */}
              <div className="relative h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 overflow-hidden">
                {item.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {item.images.slice(0, 4).map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`Shopping ${idx + 1}`}
                        className={`w-full h-full object-cover ${item.images.length === 1 ? 'col-span-2' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="text-white/20" size={64} />
                  </div>
                )}
                {item.images.length > 4 && (
                  <div className="absolute bottom-2 right-2 backdrop-blur-xl bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-semibold border border-white/20">
                    +{item.images.length - 4} more
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-white mb-3 text-lg">{item.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    ₩{item.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <User size={16} />
                    <span>{item.addedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Shopping Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddForm(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-2xl bg-slate-900/90 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="sticky top-0 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Add Shopping
                </h2>
                <motion.button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/80 hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-white/80 mb-2">
                    Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Weekly Grocery Shopping"
                    className="w-full px-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-semibold text-white/80 mb-2">
                    Amount (₩) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g., 85000"
                    className="w-full px-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Upload Images</label>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-purple-500/50 hover:bg-white/5 transition-all cursor-pointer">
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="mx-auto text-white/40 mb-3" size={40} />
                      <p className="text-sm text-white/70 font-medium">Click to upload images</p>
                      <p className="text-xs text-white/40 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {uploadedImages.map((img, idx) => (
                        <motion.div
                          key={idx}
                          className="relative group"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded-xl border border-white/10" />
                          <motion.button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X size={16} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    Add Shopping
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 backdrop-blur-xl bg-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}