import { useState, useEffect } from 'react';
import { Save, Loader2, Share2, Hash } from 'lucide-react';
import { socialApi } from '../api/endpoints';

const fields = [
  { key: 'facebookUrl', label: 'Facebook', icon: Share2, ph: 'https://facebook.com/yourpage' },
  { key: 'instagramUrl', label: 'Instagram', icon: Hash, ph: 'https://instagram.com/yourhandle' },
];

export default function Social() {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    socialApi.get().then((r) => setLinks({
      facebookUrl: r.data?.facebookUrl || '',
      instagramUrl: r.data?.instagramUrl || '',
    })).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await socialApi.update({
        facebookUrl: links.facebookUrl || '',
        instagramUrl: links.instagramUrl || '',
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#172033]">Social Media</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Manage your social media links.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xl">
          <div className="space-y-4 mb-6">
            {fields.map(({ key, label, icon: Icon, ph }) => (
              <div key={key}>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#172033] mb-1.5">
                  <Icon size={14} className="text-[#0F766E]" /> {label}
                </label>
                <input
                  value={links[key] || ''}
                  onChange={(e) => setLinks((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={ph}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0d5f58] disabled:opacity-60">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : saved ? '✓ Saved!' : <><Save size={16} /> Save Links</>}
          </button>
        </div>
      )}
    </div>
  );
}
