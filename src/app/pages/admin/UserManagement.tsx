import { useState } from 'react';
import { Edit, RotateCcw, Search } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  studentId: string;
  room: string;
  avatar: string;
  joinedDate: string;
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      studentId: '2021001234',
      room: 'Room 201',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      joinedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      studentId: '2021001235',
      room: 'Room 202',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      joinedDate: '2024-01-15',
    },
    {
      id: 3,
      name: 'Imran Ahmed',
      email: 'imran.ahmed@example.com',
      studentId: '2021001236',
      room: 'Room 203',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Imran',
      joinedDate: '2024-01-15',
    },
    {
      id: 4,
      name: 'Rahat Khan',
      email: 'rahat.khan@example.com',
      studentId: '2021001237',
      room: 'Room 204',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahat',
      joinedDate: '2024-01-16',
    },
    {
      id: 5,
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      studentId: '2021001238',
      room: 'Room 205',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      joinedDate: '2024-01-16',
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.includes(searchQuery)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage all users in the system</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or student ID..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Room</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.studentId}</td>
                  <td className="px-6 py-4 text-gray-900">{user.room}</td>
                  <td className="px-6 py-4 text-gray-600">{user.joinedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all">
                        <RotateCcw size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
