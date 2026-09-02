import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Mail, Eye } from 'lucide-react';
import { enquiriesApi } from '../api/endpoints';

const mockData = [
  { _id: '1', name: 'Deepa Krishnan', phone: '+91 87654 11111', email: 'deepa@email.com', message: 'I would like to know more about physiotherapy services for post-surgery recovery.', date: '2026-08-26', status: 'new' },
  { _id: '2', name: 'Mohan Das', phone: '+91 87654 22222', email: 'mohan@email.com', message: 'What are the consultation fees for General OPD?', date: '2026-08-25', status: 'replied' },
  { _id: '3', name: 'Ananya Iyer', phone: '+91 87654 33333', email: 'ananya@email.com', message: 'Interested in the pediatric physiotherapy program for my 5-year-old.', date: '2026-08-24', status: 'new' },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-600',
};

export default function Enquiries() {
  const [items, setItems] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<typeof mockData[0] | null>(null);

  useEffect(() => {
    enquiriesApi.getAll().then((r) => { if (r.data?.length) setItems(r.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    await enquiriesApi.updateStatus(id, status).catch(() => {});
    setItems((prev) => prev.map((e) => e._id === id ? { ...e, status } : e));
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#172033]">Enquiries</h1>
        <p className="text-[#64748B] text-sm mt-0.5">{items.filter((i) => i.status === 'new').length} new enquiries</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              {['Name', 'Contact', 'Message', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 font-semibold text-[#172033] whitespace-nowrap">{e.name}</td>
                  <td className="px-5 py-4">
                    <div className="text-[#64748B] text-xs">{e.phone}</div>
                    <div className="text-[#64748B] text-xs">{e.email}</div>
                  </td>
                  <td className="px-5 py-4 text-[#64748B] max-w-xs truncate">{e.message}</td>
                  <td className="px-5 py-4 text-[#64748B] whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[e.status] || 'bg-gray-100 text-gray-600'}`}>{e.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(e)} className="p-1.5 rounded-lg text-[#0F766E] hover:bg-[#0F766E]/10"><Eye size={14} /></button>
                      <a href={`mailto:${e.email}`} className="p-1.5 rounded-lg text-[#64748B] hover:bg-gray-100"><Mail size={14} /></a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-[#64748B] text-sm">No enquiries found.</div>}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-display text-xl text-[#172033] mb-4">Enquiry Details</h3>
            <div className="space-y-3 mb-5">
              {[['Name', selected.name], ['Phone', selected.phone], ['Email', selected.email], ['Date', selected.date]].map(([l, v]) => (
                <div key={l} className="flex gap-3">
                  <span className="text-xs font-semibold text-[#64748B] w-14 flex-shrink-0 pt-0.5">{l}</span>
                  <span className="text-sm text-[#172033]">{v}</span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="text-xs font-semibold text-[#64748B] w-14 flex-shrink-0 pt-0.5">Message</span>
                <p className="text-sm text-[#172033] leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select value={selected.status} onChange={(e) => { updateStatus(selected._id, e.target.value); setSelected((p) => p ? { ...p, status: e.target.value } : p); }}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none bg-white">
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
              <a href={`mailto:${selected.email}`} className="px-4 py-2 bg-[#0F766E] text-white text-sm font-semibold rounded-lg hover:bg-[#0d5f58] flex items-center gap-2">
                <Mail size={14} /> Reply
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
