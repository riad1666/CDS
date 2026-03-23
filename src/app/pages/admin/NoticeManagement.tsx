import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  message: string;
  type: 'important' | 'info' | 'warning';
  date: string;
}

export function NoticeManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as 'important' | 'info' | 'warning',
  });

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: 'Monthly Grocery Shopping',
      message: 'Please submit your grocery receipts by March 25th',
      type: 'important',
      date: '2026-03-20',
    },
    {
      id: 2,
      title: 'Cooking Schedule Updated',
      message: 'New cooking assignments for next week are available',
      type: 'info',
      date: '2026-03-19',
    },
    {
      id: 3,
      title: 'Pending Settlements',
      message: 'Please clear your pending balances before month end',
      type: 'warning',
      date: '2026-03-18',
    },
  ]);

  const noticeTypeColors = {
    important: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  const noticeTypeBadge = {
    important: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: notices.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
    };
    setNotices([newNotice, ...notices]);
    setFormData({ title: '', message: '', type: 'info' });
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notice Management</h1>
          <p className="text-gray-600">Create and manage notices for all users</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Create Notice
        </button>
      </div>

      {/* Notices Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`rounded-2xl border p-5 ${noticeTypeColors[notice.type]} hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${noticeTypeBadge[notice.type]}`}>
                {notice.type.toUpperCase()}
              </span>
              <div className="flex gap-1">
                <button className="p-1.5 text-blue-600 hover:bg-white rounded-lg transition-all">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="p-1.5 text-red-600 hover:bg-white rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{notice.title}</h3>
            <p className="text-sm text-gray-700 mb-3">{notice.message}</p>
            <p className="text-xs text-gray-600">{notice.date}</p>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddForm(false)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Notice</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter notice title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter notice message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'important' | 'info' | 'warning' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  <option value="info">Info</option>
                  <option value="important">Important</option>
                  <option value="warning">Warning</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Create Notice
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
