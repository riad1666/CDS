import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

export function Analytics() {
  const monthlyData = [
    { month: 'Jan', amount: 320000 },
    { month: 'Feb', amount: 280000 },
    { month: 'Mar', amount: 480000 },
  ];

  const categoryData = [
    { name: 'Grocery', value: 185000 },
    { name: 'Utilities', amount: 110000 },
    { name: 'Supplies', value: 85000 },
    { name: 'Kitchen', value: 65000 },
    { name: 'Others', value: 35000 },
  ];

  const topSpenders = [
    { name: 'John Doe', amount: 125000, percentage: 26 },
    { name: 'Sarah Lee', amount: 98000, percentage: 20 },
    { name: 'Imran Ahmed', amount: 87000, percentage: 18 },
    { name: 'Rahat Khan', amount: 76000, percentage: 16 },
    { name: 'Mike Chen', amount: 94000, percentage: 20 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">View spending patterns and statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Spending</p>
          <p className="text-3xl font-bold">₩480,000</p>
          <p className="text-xs opacity-75 mt-2">March 2026</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingCart size={24} />
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold">24</p>
          <p className="text-xs opacity-75 mt-2">This month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Active Users</p>
          <p className="text-3xl font-bold">5</p>
          <p className="text-xs opacity-75 mt-2">Contributing members</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Avg per Person</p>
          <p className="text-3xl font-bold">₩96,000</p>
          <p className="text-xs opacity-75 mt-2">This month</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Spending Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                }}
                formatter={(value: number) => `₩${value.toLocaleString()}`}
              />
              <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Spenders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-6">Top Spenders This Month</h3>
          <div className="space-y-4">
            {topSpenders.map((spender, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{spender.name}</span>
                    <span className="font-bold text-gray-900">₩{spender.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${spender.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{spender.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
