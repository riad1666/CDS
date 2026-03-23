import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  DollarSign,
  CheckCircle,
  ChefHat,
  Bell,
  BarChart3,
  Menu,
  X,
  Home,
  Sparkles,
} from 'lucide-react';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

export function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Users, label: 'Users', path: '/admin/users', gradient: 'from-blue-500 to-cyan-500' },
    { icon: DollarSign, label: 'Expenses', path: '/admin/expenses', gradient: 'from-emerald-500 to-teal-500' },
    { icon: CheckCircle, label: 'Settlements', path: '/admin/settlements', gradient: 'from-purple-500 to-pink-500' },
    { icon: ChefHat, label: 'Cooking Schedule', path: '/admin/cooking', gradient: 'from-orange-500 to-red-500' },
    { icon: Bell, label: 'Notices', path: '/admin/notices', gradient: 'from-amber-500 to-orange-500' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', gradient: 'from-indigo-500 to-purple-500' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || (path === '/admin/users' && location.pathname === '/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} />
              </motion.button>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center p-2">
                  <img src={logo} alt="CDS Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-xl text-white hidden sm:block">Admin Dashboard</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                <span className="hidden sm:inline font-medium">Dashboard</span>
              </motion.button>
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-purple-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white font-semibold text-sm">AD</span>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <motion.aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] backdrop-blur-xl bg-slate-900/80 border-r border-white/10 w-64 transition-transform z-40 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          initial={false}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -256 }}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActivePath(item.path)
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/30`
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}