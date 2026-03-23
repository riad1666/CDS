import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ChefHat, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from 'figma:asset/4cad363197dac40b810de3a56251390153decb05.png';

interface CookingAssignment {
  date: string;
  user: {
    name: string;
    avatar: string;
    room: string;
  };
}

export function CookingSchedulePage() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026

  const assignments: CookingAssignment[] = [
    {
      date: '2026-03-23',
      user: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        room: 'Room 201',
      },
    },
    {
      date: '2026-03-24',
      user: {
        name: 'Sarah Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        room: 'Room 202',
      },
    },
    {
      date: '2026-03-25',
      user: {
        name: 'Imran Ahmed',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Imran',
        room: 'Room 203',
      },
    },
    {
      date: '2026-03-26',
      user: {
        name: 'Rahat Khan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahat',
        room: 'Room 204',
      },
    },
    {
      date: '2026-03-27',
      user: {
        name: 'Mike Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        room: 'Room 205',
      },
    },
    {
      date: '2026-03-28',
      user: {
        name: 'Emily Park',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        room: 'Room 206',
      },
    },
    {
      date: '2026-03-29',
      user: {
        name: 'David Kim',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        room: 'Room 207',
      },
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getAssignmentForDate = (day: number) => {
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return assignments.find((a) => a.date === dateString);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                  <ChefHat className="text-orange-400" size={22} />
                </div>
                <h1 className="font-bold text-xl text-white">Cooking Schedule</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar View */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={previousMonth}
              className="px-5 py-2.5 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl transition-all font-semibold text-white flex items-center gap-2 border border-white/10"
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
              Previous
            </motion.button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                <CalendarIcon className="text-orange-400" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {monthName}
              </h2>
            </div>
            <motion.button
              onClick={nextMonth}
              className="px-5 py-2.5 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl transition-all font-semibold text-white flex items-center gap-2 border border-white/10"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <ChevronRight size={20} />
            </motion.button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {/* Weekday Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-white/60 py-3 text-sm md:text-base">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const assignment = getAssignmentForDate(day);
              const isToday =
                day === 23 &&
                currentMonth.getMonth() === 2 &&
                currentMonth.getFullYear() === 2026;

              return (
                <motion.div
                  key={day}
                  className={`aspect-square border rounded-2xl p-2 md:p-3 backdrop-blur-xl transition-all ${
                    isToday
                      ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-lg shadow-indigo-500/30'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.01 }}
                >
                  <div className="h-full flex flex-col">
                    <div className={`text-xs md:text-sm font-bold mb-2 ${isToday ? 'text-indigo-400' : 'text-white'}`}>
                      {day}
                    </div>
                    {assignment && (
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <motion.img
                          src={assignment.user.avatar}
                          alt={assignment.user.name}
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full mb-1 border-2 border-orange-400/50 ring-2 ring-orange-400/20"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                        />
                        <p className="text-[10px] md:text-xs font-semibold text-white text-center line-clamp-1">
                          {assignment.user.name.split(' ')[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* List View */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <CalendarIcon className="text-orange-400" size={24} />
            </div>
            <h3 className="font-bold text-white text-xl">Upcoming Assignments</h3>
          </div>
          <div className="space-y-3">
            {assignments.map((assignment, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4 p-4 backdrop-blur-xl bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ x: 4, scale: 1.01 }}
              >
                <div className="relative">
                  <motion.img
                    src={assignment.user.avatar}
                    alt={assignment.user.name}
                    className="w-14 h-14 rounded-full border-2 border-orange-400/30 ring-2 ring-orange-400/10 group-hover:ring-orange-400/30 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">{assignment.user.name}</p>
                  <p className="text-sm text-white/50">{assignment.user.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{assignment.date}</p>
                  <p className="text-sm text-white/50">
                    {new Date(assignment.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}