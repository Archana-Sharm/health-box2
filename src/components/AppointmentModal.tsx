import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { appointmentsApi } from '../api/endpoints';

interface Props { open: boolean; onClose: () => void; }

const services = [
  'General OPD Consultation',
  'Orthopedic & Joint Physiotherapy',
  'Neuro Rehabilitation',
  'Sports Injury Rehabilitation',
  'Pain Management',
  'Post-operative Rehabilitation',
  "Women's Health Physiotherapy",
  'Pediatric Physiotherapy',
  'Cardiac Rehabilitation',
  'Geriatric Physiotherapy',
];

const timeSlots = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','5:00 PM','5:30 PM','6:00 PM'];

export default function AppointmentModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    patientName: '', phone: '', email: '', doctor: '', service: '',
    preferredDate: '', preferredTime: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!open) return null;

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await appointmentsApi.book(form);
      setStatus('success');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to book appointment. Please try again.';
      setErrorMsg(msg);
      setStatus('error');
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0F766E] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-display text-xl">Book an Appointment</h2>
            <p className="text-teal-100 text-xs mt-0.5">We'll confirm within 2 hours</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle size={52} className="text-[#0F766E] mx-auto mb-4" />
              <h3 className="font-display text-2xl text-[#172033] mb-2">Appointment Requested!</h3>
              <p className="text-[#64748B] text-sm mb-6">Thank you, {form.patientName}! We'll confirm your appointment shortly.</p>
              <button onClick={onClose} className="px-6 py-3 bg-[#0F766E] text-white rounded-lg font-semibold text-sm hover:bg-[#0d5f58]">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="flex gap-2 items-start p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Patient Name *</label>
                  <input required value={form.patientName} onChange={(e) => set('patientName', e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Phone *</label>
                  <input required value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Service Required</label>
                  <select value={form.service} onChange={(e) => set('service', e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-white">
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Preferred Date *</label>
                  <input required type="date" value={form.preferredDate} onChange={(e) => set('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Preferred Time</label>
                  <select value={form.preferredTime} onChange={(e) => set('preferredTime', e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-white">
                    <option value="">Any time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Message / Symptoms</label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="Briefly describe your concern..."
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] resize-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-[#0F766E] text-white font-semibold text-sm rounded-lg hover:bg-[#0d5f58] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Booking...</>
                ) : 'Confirm Appointment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
