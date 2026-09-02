import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Filter } from 'lucide-react';
import { appointmentsApi } from '../api/endpoints';

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

const mockData = [
  { _id: '1', patientName: 'Kavitha Reddy', phone: '+91 98765 11111', email: 'kavitha@email.com', service: 'Physiotherapy', doctor: 'Dr. Rahul Verma', date: '2026-08-27', time: '10:00 AM', status: 'confirmed', message: 'Knee pain for 3 weeks' },
  { _id: '2', patientName: 'Rajan Mehta', phone: '+91 98765 22222', email: 'rajan@email.com', service: 'General OPD', doctor: 'Dr. Priya Sharma', date: '2026-08-27', time: '11:30 AM', status: 'pending', message: 'Fever and headache' },
  { _id: '3', patientName: 'Sunita Patel', phone: '+91 98765 33333', email: 'sunita@email.com', service: 'Sports Injury', doctor: 'Dr. Arun Kapoor', date: '2026-08-28', time: '9:00 AM', status: 'pending', message: 'Ankle sprain' },
];

export default function Appointments() {
  const [items, setItems] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    appointmentsApi.getAll()
      .then((r) => { if (r.data?.length) setItems(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    await appointmentsApi.updateStatus(id, status).catch(() => setError('Failed to update status.'));
    setItems((prev) => prev.map((a) => a._id === id ? { ...a, status } : a));
  }

  const filtered = filterStatus === 'all' ? items : items.filter((a) => a.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[#172033]">Appointments</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{items.length} total appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 bg-white">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && <div className="flex gap-2 items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4"><AlertCircle size={14} />{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50">
                {['Patient', 'Service', 'Doctor', 'Date & Time', 'Status', 'Update'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#172033]">{a.patientName}</div>
                      <div className="text-[#64748B] text-xs">{a.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-[#64748B]">{a.service}</td>
                    <td className="px-5 py-4 text-[#64748B] whitespace-nowrap">{a.doctor}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-[#172033] text-sm">{a.date}</div>
                      <div className="text-[#64748B] text-xs">{a.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[a.status] || 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <select value={a.status} onChange={(e) => updateStatus(a._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none bg-white">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-[#64748B] text-sm">No appointments found.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
