import { useState, useEffect } from 'react';
import { Users, CalendarCheck, Clock, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';
import { dashboardApi, appointmentsApi } from '../api/endpoints';

const mockStats = { doctors: 15, appointments: 248, pendingAppointments: 12, enquiries: 67 };
const mockRecent = [
  { id: '1', patientName: 'Kavitha Reddy', service: 'Physiotherapy', date: '2026-08-27', time: '10:00 AM', status: 'confirmed' },
  { id: '2', patientName: 'Rajan Mehta', service: 'General OPD', date: '2026-08-27', time: '11:30 AM', status: 'pending' },
  { id: '3', patientName: 'Sunita Patel', service: 'Sports Injury', date: '2026-08-28', time: '9:00 AM', status: 'pending' },
  { id: '4', patientName: 'Arjun Singh', service: 'Neuro Rehab', date: '2026-08-28', time: '2:00 PM', status: 'confirmed' },
  { id: '5', patientName: 'Deepa Nair', service: 'Pain Management', date: '2026-08-29', time: '3:30 PM', status: 'completed' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [recent, setRecent] = useState(mockRecent);

  useEffect(() => {
    dashboardApi.stats().then((r) => setStats(r.data)).catch(() => {});
    appointmentsApi.getAll().then((r) => { if (r.data?.length) setRecent(r.data.slice(0, 5)); }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Doctors', value: stats.doctors, icon: Users, color: '#0F766E', bg: '#0F766E15' },
    { label: 'Total Appointments', value: stats.appointments, icon: CalendarCheck, color: '#7C3AED', bg: '#7C3AED15' },
    { label: 'Pending Appointments', value: stats.pendingAppointments, icon: Clock, color: '#F59E0B', bg: '#F59E0B15' },
    { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare, color: '#E63946', bg: '#E6394615' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#172033]">Dashboard</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <ArrowUpRight size={14} className="text-gray-300" />
            </div>
            <div className="font-display text-3xl text-[#172033]">{value}</div>
            <div className="text-xs text-[#64748B] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-[#172033] text-sm">Recent Appointments</h2>
          <TrendingUp size={16} className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {['Patient', 'Service', 'Date', 'Time', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-[#172033] text-sm">{a.patientName}</td>
                  <td className="px-5 py-3.5 text-[#64748B] text-sm">{a.service}</td>
                  <td className="px-5 py-3.5 text-[#64748B] text-sm">{a.date}</td>
                  <td className="px-5 py-3.5 text-[#64748B] text-sm">{a.time}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[a.status] || 'bg-gray-100 text-gray-600'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
