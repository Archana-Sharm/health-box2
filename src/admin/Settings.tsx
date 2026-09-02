import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { settingsApi } from '../api/endpoints';

const defaultSettings = {
  websiteName: 'Health Box Polyclinic & Advance Physiotherapy Center',
  phone: '+91 98765 43210',
  email: 'info@healthboxpolyclinic.com',
  address: '123 Medical Plaza, Sector 14, Your City – 400001',
  openingHours: '9:00 AM – 8:00 PM',
  googleMapsUrl: '',
  footerDescription: 'Advanced healthcare with a patient-first approach.',
};

export default function Settings() {
  const [form, setForm] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsApi.get().then((r) => {
      if (r.data) setForm({ ...defaultSettings, ...r.data });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsApi.update(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { } finally { setSaving(false); }
  }

  const sections = [
    {
      title: 'Clinic Information',
      fields: [
        { k: 'websiteName', label: 'Clinic Name', ph: 'Health Box Polyclinic' },
        { k: 'footerDescription', label: 'Footer Description', ph: 'Brief clinic summary', textarea: true },
      ],
    },
    {
      title: 'Contact Details',
      fields: [
        { k: 'phone', label: 'Phone Number', ph: '+91 98765 43210' },
        { k: 'email', label: 'Email Address', ph: 'info@healthbox.com' },
        { k: 'address', label: 'Full Address', ph: '123 Medical Plaza...', textarea: true },
      ],
    },
    {
      title: 'Opening Hours & Maps',
      fields: [
        { k: 'openingHours', label: 'Opening Hours', ph: 'Mon-Sat: 9:00 AM – 8:00 PM' },
        { k: 'googleMapsUrl', label: 'Google Maps URL', ph: 'https://maps.google.com/...' },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#172033]">Settings</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Manage clinic information and website settings.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          {sections.map(({ title, fields }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-[#172033] mb-4">{title}</h2>
              <div className="space-y-4">
                {fields.map(({ k, label, ph, textarea }) => (
                  <div key={k}>
                    <label className="block text-xs font-semibold text-[#172033] mb-1.5">{label}</label>
                    {textarea ? (
                      <textarea value={(form as Record<string,string>)[k] || ''} onChange={(e) => set(k, e.target.value)}
                        placeholder={ph} rows={2}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] resize-none" />
                    ) : (
                      <input value={(form as Record<string,string>)[k] || ''} onChange={(e) => set(k, e.target.value)}
                        placeholder={ph}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0d5f58] disabled:opacity-60">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : saved ? '✓ Saved!' : <><Save size={16} /> Save Settings</>}
          </button>
        </form>
      )}
    </div>
  );
}
