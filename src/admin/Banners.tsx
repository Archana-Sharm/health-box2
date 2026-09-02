import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { bannersApi } from '../api/endpoints';

interface Banner {
  _id?: string;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonUrl: string;
  status: 'active' | 'inactive';
  desktopImage?: string;
  mobileImage?: string;
}

const empty: Omit<Banner, '_id'> = {
  heading: '',
  subheading: '',
  buttonText: '',
  buttonUrl: '',
  status: 'active',
};

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Banner>(empty as Banner);
  const [saving, setSaving] = useState(false);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

  function load() {
    bannersApi.getAll().then((r) => setBanners(r.data || [])).catch(() => setBanners([])).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function openAdd() { setEditing(empty as Banner); setDesktopFile(null); setMobileFile(null); setModal(true); }
  function openEdit(b: Banner) { setEditing({ ...b }); setDesktopFile(null); setMobileFile(null); setModal(true); }

  async function save() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('heading', editing.heading);
      fd.append('subheading', editing.subheading || '');
      fd.append('buttonText', editing.buttonText || '');
      fd.append('buttonUrl', editing.buttonUrl || '');
      fd.append('status', editing.status);
      if (desktopFile) fd.append('desktopImage', desktopFile);
      if (mobileFile) fd.append('mobileImage', mobileFile);
      if (editing._id) { await bannersApi.update(editing._id, fd); }
      else { await bannersApi.create(fd); }
      setModal(false);
      load();
    } catch { } finally { setSaving(false); }
  }

  async function remove(id: string) {
    if (!confirm('Delete this banner?')) return;
    await bannersApi.delete(id).then(load).catch(() => {});
  }

  async function toggleActive(b: Banner) {
    const nextStatus = b.status === 'active' ? 'inactive' : 'active';
    const fd = new FormData();
    fd.append('status', nextStatus);
    await bannersApi.update(b._id!, fd).catch(() => {});
    setBanners((prev) => prev.map((x) => x._id === b._id ? { ...x, status: nextStatus } : x));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[#172033]">Banners</h1>
          <p className="text-[#64748B] text-sm mt-0.5">Manage homepage hero banners.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0d5f58]">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <div className="grid gap-4">
          {banners.map((b) => (
            <div key={b._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              {b.desktopImage && <img src={b.desktopImage} alt={b.heading} className="w-24 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#172033]">{b.heading}</div>
                <div className="text-sm text-[#64748B] truncate">{b.subheading}</div>
                <div className="text-xs text-[#64748B] mt-1">{b.buttonText} → {b.buttonUrl}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => toggleActive(b)} className={b.status === 'active' ? 'text-[#0F766E]' : 'text-gray-400'}>
                  {b.status === 'active' ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
                <button onClick={() => openEdit(b)} className="p-1.5 text-[#0F766E] hover:bg-[#0F766E]/10 rounded-lg"><Pencil size={14} /></button>
                <button onClick={() => remove(b._id!)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {banners.length === 0 && <div className="text-center py-12 text-[#64748B] text-sm bg-white rounded-2xl border border-gray-100">No banners yet.</div>}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0F766E] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-display text-xl">{editing._id ? 'Edit Banner' : 'Add Banner'}</h2>
              <button onClick={() => setModal(false)} className="p-1 hover:bg-white/20 rounded-full"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { k: 'heading', label: 'Heading', ph: 'Your Health, Our Commitment' },
                { k: 'subheading', label: 'Subheading', ph: 'Expert care under one roof' },
                { k: 'buttonText', label: 'Button Text', ph: 'Book Appointment' },
                { k: 'buttonUrl', label: 'Button URL', ph: '/contact' },
              ].map(({ k, label, ph }) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">{label}</label>
                  <input value={(editing as Record<string,unknown>)[k] as string || ''} onChange={(e) => setEditing((p) => ({ ...p, [k]: e.target.value }))}
                    placeholder={ph}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Desktop Banner Image</label>
                <input type="file" accept="image/*" onChange={(e) => setDesktopFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0F766E]/10 file:text-[#0F766E]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Mobile Banner Image</label>
                <input type="file" accept="image/*" onChange={(e) => setMobileFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0F766E]/10 file:text-[#0F766E]" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={editing.status === 'active'} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.checked ? 'active' : 'inactive' }))} className="sr-only" />
                <div className={`w-10 h-5 rounded-full transition-colors ${editing.status === 'active' ? 'bg-[#0F766E]' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${editing.status === 'active' ? 'translate-x-5' : ''}`} />
                </div>
                <span className="text-sm text-[#172033] font-medium">Active</span>
              </label>
              <button onClick={save} disabled={saving}
                className="w-full py-3 bg-[#0F766E] text-white font-semibold text-sm rounded-xl hover:bg-[#0d5f58] disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Banner</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
