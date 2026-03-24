import { useState, useEffect } from 'react';
import { Edit, RotateCcw, Search, CheckCircle, XCircle } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCol = collection(db, 'users');
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId?.includes(searchQuery)
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
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
                  <td className="px-6 py-4 text-gray-900">{user.room || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'approved' ? 'bg-green-100 text-green-700' :
                      user.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {(user.status || 'approved').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.joinedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {user.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(user.id, 'approved')} title="Approve" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => updateStatus(user.id, 'rejected')} title="Reject" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {user.status !== 'pending' && (
                         <>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-all">
                            <RotateCcw size={18} />
                          </button>
                        </>
                      )}
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
