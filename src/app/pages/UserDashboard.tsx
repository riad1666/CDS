import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Bell,
  ShoppingCart,
  ChefHat,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Sparkles,
  Activity,
} from 'lucide-react';
import { BalanceModal } from '../components/BalanceModal';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

interface Notice {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'important' | 'info' | 'warning';
}

interface BalanceItem {
  id: number;
  name: string;
  room: string;
  amount: number;
  avatar: string;
  phone: string;
}

export function UserDashboard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('2026-02-21');
  const [endDate, setEndDate] = useState('2026-03-23');
  const [activeTab, setActiveTab] = useState<'receive' | 'owe'>('receive');
  const [selectedBalance, setSelectedBalance] = useState<BalanceItem | null>(null);

  const notices: Notice[] = [
    {
      id: 1,
      title: 'Monthly Grocery Shopping',
      message: 'Please submit your grocery receipts by March 25th',
      date: '2026-03-20',
      type: 'important',
    },
    {
      id: 2,
      title: 'Cooking Schedule Updated',
      message: 'New cooking assignments for next week are available',
      date: '2026-03-19',
      type: 'info',
    },
    {
      id: 3,
      title: 'Pending Settlements',
      message: 'Please clear your pending balances before month end',
      date: '2026-03-18',
      type: 'warning',
    },
  ];

  const receiveList: BalanceItem[] = [
    {
      id: 1,
      name: 'Imran Ahmed',
      room: 'Room 201',
      amount: 25000,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Imran',
      phone: '+82-10-1234-5678',
    },
    {
      id: 2,
      name: 'Rahat Khan',
      room: 'Room 203',
      amount: 18500,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahat',
      phone: '+82-10-2345-6789',
    },
  ];

  const oweList: BalanceItem[] = [
    {
      id: 3,
      name: 'Sarah Lee',
      room: 'Room 205',
      amount: 15000,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      phone: '+82-10-3456-7890',
    },
  ];

  const activities = [
    { id: 1, text: 'You paid Imran ₩12,000', type: 'paid', date: '2 hours ago' },
    { id: 2, text: 'Rahat paid you ₩8,000', type: 'received', date: '5 hours ago' },
    { id: 3, text: 'You added shopping expense ₩45,000', type: 'expense', date: '1 day ago' },
    { id: 4, text: 'Settlement approved ₩20,000', type: 'settlement', date: '2 days ago' },
  ];

  const noticeTypeColors = {
    important: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  };

  const noticeTypeBadge = {
    important: 'bg-gradient-to-r from-rose-500 to-pink-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-all">
                <Menu size={24} className="text-white" />
              </button>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center p-2">
                  <img src={logo} alt="CDS Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  CDS
                </span>
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => navigate('/shopping')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                <span>Shopping</span>
              </motion.button>
              <motion.button
                onClick={() => navigate('/cooking')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChefHat size={20} />
                <span>Cooking</span>
              </motion.button>
              <motion.button
                onClick={() => navigate('/admin')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={20} />
                <span>Admin</span>
              </motion.button>
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-purple-500/50"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white font-semibold text-sm">JD</span>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notice Board */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
              <Bell className="text-indigo-400" size={24} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Notice Board
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`rounded-3xl border backdrop-blur-xl p-6 cursor-pointer bg-gradient-to-br ${noticeTypeColors[notice.type]} shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-semibold text-white ${noticeTypeBadge[notice.type]}`}>
                    {notice.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/60">{notice.date}</span>
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{notice.title}</h3>
                <p className="text-sm text-white/70">{notice.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all shadow-xl hover:shadow-2xl group"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="text-indigo-400" size={28} />
              </div>
            </div>
            <p className="text-sm text-white/60 mb-1 font-medium">Total Spent</p>
            <p className="text-3xl font-bold text-white">₩125,000</p>
            <div className="mt-3 text-xs text-green-400 flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>+12% from last month</span>
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-500/30 transition-all shadow-xl hover:shadow-2xl group"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="text-emerald-400" size={28} />
              </div>
            </div>
            <p className="text-sm text-white/60 mb-1 font-medium">You'll Receive</p>
            <p className="text-3xl font-bold text-emerald-400">₩43,500</p>
            <div className="mt-3 text-xs text-emerald-400/80">2 pending payments</div>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 rounded-3xl p-6 border border-rose-500/20 hover:border-rose-500/30 transition-all shadow-xl hover:shadow-2xl group"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowDownRight className="text-rose-400" size={28} />
              </div>
            </div>
            <p className="text-sm text-white/60 mb-1 font-medium">You Owe</p>
            <p className="text-3xl font-bold text-rose-400">₩15,000</p>
            <div className="mt-3 text-xs text-rose-400/80">1 outstanding balance</div>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/30 transition-all shadow-xl hover:shadow-2xl group"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="text-cyan-400" size={28} />
              </div>
            </div>
            <p className="text-sm text-white/60 mb-1 font-medium">Total Group Spent</p>
            <p className="text-3xl font-bold text-white">₩480,000</p>
            <div className="mt-3 text-xs text-cyan-400/80">12 members active</div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Date Filter */}
            <motion.div
              className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="text-purple-400" size={20} />
                </div>
                <h3 className="font-bold text-white text-lg">Date Filter</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-white/60 mb-2 font-medium">From</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500/50 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-white/60 mb-2 font-medium">To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500/50 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>
            </motion.div>

            {/* Balance Section */}
            <motion.div
              className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-bold text-white mb-6 text-xl">Balance Overview</h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('receive')}
                  className={`flex-1 px-4 py-3 font-semibold rounded-xl transition-all ${
                    activeTab === 'receive'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  You'll Receive ({receiveList.length})
                </button>
                <button
                  onClick={() => setActiveTab('owe')}
                  className={`flex-1 px-4 py-3 font-semibold rounded-xl transition-all ${
                    activeTab === 'owe'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  You Owe ({oweList.length})
                </button>
              </div>

              {/* Balance List */}
              <div className="space-y-3">
                {(activeTab === 'receive' ? receiveList : oweList).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => setSelectedBalance(item)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 cursor-pointer transition-all border border-white/5 hover:border-white/20 backdrop-blur-sm group"
                  >
                    <div className="relative">
                      <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-lg">{item.name}</p>
                      <p className="text-sm text-white/50">{item.room}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-xl ${activeTab === 'receive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ₩{item.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-white/40 mt-1">Click for details</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-3xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 text-lg group relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                Add Expense
              </motion.button>
              <motion.button
                className="backdrop-blur-xl bg-white/10 border-2 border-purple-500/50 text-white p-6 rounded-3xl font-bold hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3 text-lg group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                Settle Payment
              </motion.button>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <Activity className="text-blue-400" size={20} />
              </div>
              <h3 className="font-bold text-white text-xl">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{activity.text}</p>
                    <p className="text-xs text-white/40 mt-1">{activity.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Balance Modal */}
      {selectedBalance && (
        <BalanceModal
          balance={selectedBalance}
          onClose={() => setSelectedBalance(null)}
          type={activeTab}
        />
      )}
    </div>
  );
}