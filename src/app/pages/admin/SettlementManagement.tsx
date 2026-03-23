import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';

interface Settlement {
  id: number;
  from: string;
  to: string;
  amount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected';
  note?: string;
}

export function SettlementManagement() {
  const [settlements, setSettlements] = useState<Settlement[]>([
    {
      id: 1,
      from: 'John Doe',
      to: 'Sarah Lee',
      amount: 25000,
      date: '2026-03-22',
      status: 'pending',
      note: 'Grocery payment',
    },
    {
      id: 2,
      from: 'Imran Ahmed',
      to: 'Rahat Khan',
      amount: 15000,
      date: '2026-03-21',
      status: 'confirmed',
      note: 'Electricity bill',
    },
    {
      id: 3,
      from: 'Mike Chen',
      to: 'John Doe',
      amount: 12000,
      date: '2026-03-20',
      status: 'pending',
    },
    {
      id: 4,
      from: 'Sarah Lee',
      to: 'Imran Ahmed',
      amount: 18500,
      date: '2026-03-19',
      status: 'confirmed',
      note: 'Shopping split',
    },
    {
      id: 5,
      from: 'Rahat Khan',
      to: 'Mike Chen',
      amount: 8000,
      date: '2026-03-18',
      status: 'rejected',
      note: 'Disputed amount',
    },
  ]);

  const handleApprove = (id: number) => {
    setSettlements(
      settlements.map((settlement) =>
        settlement.id === id ? { ...settlement, status: 'confirmed' as const } : settlement
      )
    );
  };

  const handleReject = (id: number) => {
    setSettlements(
      settlements.map((settlement) =>
        settlement.id === id ? { ...settlement, status: 'rejected' as const } : settlement
      )
    );
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  const pendingSettlements = settlements.filter((s) => s.status === 'pending');
  const confirmedSettlements = settlements.filter((s) => s.status === 'confirmed');
  const rejectedSettlements = settlements.filter((s) => s.status === 'rejected');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settlement Management</h1>
        <p className="text-gray-600">Approve or reject payment settlements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <p className="text-sm text-yellow-700 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{pendingSettlements.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="text-sm text-green-700 mb-1">Confirmed</p>
          <p className="text-2xl font-bold text-green-900">{confirmedSettlements.length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-sm text-red-700 mb-1">Rejected</p>
          <p className="text-2xl font-bold text-red-900">{rejectedSettlements.length}</p>
        </div>
      </div>

      {/* Settlements List */}
      <div className="space-y-4">
        {settlements.map((settlement) => (
          <div
            key={settlement.id}
            className={`bg-white rounded-2xl border-2 p-6 ${statusColors[settlement.status]} hover:shadow-md transition-all`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{settlement.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-gray-900">{settlement.to}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">₩{settlement.amount.toLocaleString()}</p>
                {settlement.note && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Note:</span> {settlement.note}
                  </p>
                )}
                <p className="text-sm text-gray-500">{settlement.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    settlement.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : settlement.status === 'confirmed'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
                </span>

                {settlement.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(settlement.id)}
                      className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                      title="Approve"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => handleReject(settlement.id)}
                      className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
                      title="Reject"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                {settlement.status !== 'pending' && (
                  <button className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                    <Eye size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
