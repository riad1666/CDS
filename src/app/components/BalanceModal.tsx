import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, TrendingUp, Calendar } from 'lucide-react';

interface BalanceItem {
  id: number;
  name: string;
  room: string;
  amount: number;
  avatar: string;
  phone: string;
}

interface BalanceModalProps {
  balance: BalanceItem;
  onClose: () => void;
  type: 'receive' | 'owe';
}

export function BalanceModal({ balance, onClose, type }: BalanceModalProps) {
  const transactions = [
    { id: 1, description: 'Monthly Grocery Shopping', amount: 12000, date: '2026-03-15' },
    { id: 2, description: 'Electricity Bill', amount: 8500, date: '2026-03-10' },
    { id: 3, description: 'Internet Payment', amount: 5000, date: '2026-03-05' },
    { id: 4, description: 'Cleaning Supplies', amount: 3500, date: '2026-02-28' },
    { id: 5, description: 'Water Bill', amount: 4000, date: '2026-02-25' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
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
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header */}
          <div className="sticky top-0 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Balance Details
            </h2>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/80 hover:text-white"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <motion.img
                  src={balance.avatar}
                  alt={balance.name}
                  className="w-20 h-20 rounded-full ring-4 ring-purple-500/30"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{balance.name}</h3>
                <p className="text-white/60">{balance.room}</p>
                <motion.a
                  href={`https://wa.me/${balance.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mt-2"
                  whileHover={{ scale: 1.05, x: 4 }}
                >
                  <Phone size={16} />
                  <span className="text-sm font-medium">{balance.phone}</span>
                </motion.a>
              </div>
            </div>

            <motion.div
              className={`backdrop-blur-xl bg-gradient-to-br ${
                type === 'receive' 
                  ? 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' 
                  : 'from-rose-500/20 to-pink-500/20 border-rose-500/30'
              } rounded-2xl p-6 border shadow-lg`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={type === 'receive' ? 'text-emerald-400' : 'text-rose-400'} size={20} />
                <p className="text-sm text-white/60 font-medium">
                  {type === 'receive' ? 'Total to Receive' : 'Total to Pay'}
                </p>
              </div>
              <p className={`text-4xl font-bold ${type === 'receive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                ₩{balance.amount.toLocaleString()}
              </p>
            </motion.div>
          </div>

          {/* Transaction History */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="text-purple-400" size={20} />
              <h3 className="font-bold text-white text-lg">Transaction History</h3>
            </div>
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-white/20 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <div>
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-sm text-white/50 mt-1">{transaction.date}</p>
                  </div>
                  <p className="font-bold text-white text-lg">₩{transaction.amount.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                className={`bg-gradient-to-r ${
                  type === 'receive'
                    ? 'from-emerald-500 to-teal-500 shadow-emerald-500/30'
                    : 'from-rose-500 to-pink-500 shadow-rose-500/30'
                } text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all relative overflow-hidden group`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {type === 'receive' ? 'Request Payment' : 'Settle Now'}
              </motion.button>
              <motion.button
                onClick={onClose}
                className="backdrop-blur-xl bg-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
