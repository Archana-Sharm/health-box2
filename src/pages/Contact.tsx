import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { enquiriesApi } from '../api/endpoints';

interface OutletCtx { openModal: () => void; }

export default function Contact() {
  const { openModal } = useOutletContext<OutletCtx>();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await enquiriesApi.submit(form);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err: unknown) {
      setErrMsg((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to send. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div>
      <section className="bg-[#172033] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Get in Touch</span>
          <h1 className="font-display text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">We're here to answer your questions and help you book your care.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14">
        <div>
          <h2 className="font-display text-3xl text-[#172033] mb-6">Reach Us Anytime</h2>
          <div className="space-y-5 mb-10">
            {[
              { icon: MapPin, label: 'Address', value: '123 Medical Plaza, Sector 14\nYour City – 400001', color: '#E52328' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210\n+91 87654 32109', color: '#8DC63F' },
              { icon: Mail, label: 'Email', value: 'info@healthboxpolyclinic.com\nappt@healthboxpolyclinic.com', color: '#E52328' },
              { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9:00 AM – 8:00 PM\nSunday: 9:00 AM – 2:00 PM', color: '#FBC011' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm text-[#64748B] whitespace-pre-line">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 h-56 bg-gray-100 relative">
            <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop&auto=format" alt="Location map" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-semibold text-[#172033]">
                <MapPin size={16} className="text-[#E52328]" />
                Health Box Polyclinic
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-display text-2xl text-[#172033] mb-1">Send Us a Message</h2>
          <p className="text-[#64748B] text-sm mb-6">We'll respond within 24 hours.</p>

          {status === 'success' ? (
            <div className="text-center py-10">
              <CheckCircle size={48} className="text-[#E52328] mx-auto mb-3" />
              <h3 className="font-display text-xl text-[#172033] mb-2">Message Sent!</h3>
              <p className="text-sm text-[#64748B]">Thank you for reaching out. We'll be in touch shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-5 text-sm text-[#E52328] font-semibold hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="flex gap-2 items-start p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />{errMsg}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Your Name *</label>
                  <input required value={form.name} onChange={(e) => set('name', e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52328]/30 focus:border-[#E52328]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Phone *</label>
                  <input required value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52328]/30 focus:border-[#E52328]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52328]/30 focus:border-[#E52328]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">Message *</label>
                  <textarea required value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E52328]/30 focus:border-[#E52328] resize-none" />
                </div>
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3 bg-[#E52328] text-white font-semibold text-sm rounded-xl hover:bg-[#c91d22] disabled:opacity-60 flex items-center justify-center gap-2">
                {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={14} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
