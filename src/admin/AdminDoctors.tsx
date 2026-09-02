import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, X, Save } from 'lucide-react';
import { doctorsApi } from '../api/endpoints';

interface Doctor {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  specialization: string;
  department: string;
  qualification: string;
  experience: string;
  bio?: string;
  status: string;
  photo?: string;
}

const emptyDoc: Omit<Doctor, '_id'> = {
  name: '',
  phone: '',
  email: '',
  specialization: '',
  department: '',
  qualification: '',
  experience: '',
  bio: '',
  status: 'active',
};

function normalizeDoctors(responseData: unknown): Doctor[] {
  if (Array.isArray(responseData)) return responseData as Doctor[];

  if (responseData && typeof responseData === 'object') {
    const payload = responseData as Record<string, unknown>;
    if (Array.isArray(payload.data)) return payload.data as Doctor[];
    if (Array.isArray(payload.doctors)) return payload.doctors as Doctor[];
  }

  return [];
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<null | 'add' | 'edit'>(null);
  const [editing, setEditing] = useState<Doctor & { _id?: string }>(emptyDoc as Doctor);
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);

  function load() {
    setLoading(true);
    doctorsApi.getAll()
      .then((r) => {
        setError('');
        setDoctors(normalizeDoctors(r.data));
      })
      .catch((err) => setError(err?.response?.data?.message || 'Failed to load doctors.'))
      .finally(() => setLoading(false));
  }
  useEffect(load, []);

  function openAdd() { setEditing(emptyDoc as Doctor); setImgFile(null); setModal('add'); }
  function openEdit(d: Doctor) { setEditing({ ...d }); setImgFile(null); setModal('edit'); }

  async function save() {
    setSaving(true);
    try {
      const fd = new FormData();
      const fields: Record<string, string | undefined> = {
        name: editing.name,
        phone: editing.phone,
        email: editing.email,
        specialization: editing.specialization,
        department: editing.department,
        qualification: editing.qualification,
        experience: editing.experience,
        bio: editing.bio,
        status: editing.status,
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') fd.append(key, value);
      });

      if (imgFile) fd.append('photo', imgFile);
      if (modal === 'add') { await doctorsApi.create(fd); }
      else if (editing._id) { await doctorsApi.update(editing._id, fd); }
      setModal(null);
      setError('');
      load();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to save doctor.');
    } finally { setSaving(false); }
  }

  async function remove(id: string) {
    if (!confirm('Delete this doctor?')) return;
    await doctorsApi.delete(id).then(load).catch((err) => setError(err?.response?.data?.message || 'Failed to delete doctor.'));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[#172033]">Doctors</h1>
          <p className="text-[#64748B] text-sm mt-0.5">Manage your medical team.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0d5f58]">
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {error && <div className="flex gap-2 items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4"><AlertCircle size={14} />{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-[#0F766E]" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              {['Doctor', 'Specialty', 'Experience', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {doctors.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={doc.photo || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop`} alt={doc.name} className="w-9 h-9 rounded-full object-cover bg-gray-100" />
                      <div>
                        <div className="font-semibold text-[#172033]">{doc.name}</div>
                        <div className="text-[#64748B] text-xs">{doc.qualification}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#64748B]">{doc.specialization}</td>
                  <td className="px-5 py-4 text-[#64748B]">{doc.experience}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{doc.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(doc)} className="p-1.5 rounded-lg text-[#0F766E] hover:bg-[#0F766E]/10"><Pencil size={14} /></button>
                      <button onClick={() => remove(doc._id!)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {doctors.length === 0 && <div className="text-center py-12 text-[#64748B] text-sm">No doctors found. Add your first doctor.</div>}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0F766E] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-display text-xl">{modal === 'add' ? 'Add Doctor' : 'Edit Doctor'}</h2>
              <button onClick={() => setModal(null)} className="p-1 hover:bg-white/20 rounded-full"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { k: 'name', label: 'Full Name', ph: 'Dr. Name' },
                { k: 'phone', label: 'Phone Number', ph: '+91 98765 43210' },
                { k: 'email', label: 'Email', ph: 'doctor@healthbox.com' },
                { k: 'qualification', label: 'Qualification', ph: 'MBBS, MD...' },
                { k: 'specialization', label: 'Specialization', ph: 'Physiotherapist' },
                { k: 'department', label: 'Department', ph: 'Orthopedics' },
                { k: 'experience', label: 'Experience', ph: '10 years' },
              ].map(({ k, label, ph }) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-[#172033] mb-1.5">{label}</label>
                  <input value={(editing as Record<string,string>)[k] || ''} onChange={(e) => setEditing((p) => ({ ...p, [k]: e.target.value }))}
                    placeholder={ph}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Bio</label>
                <textarea value={editing.bio || ''} onChange={(e) => setEditing((p) => ({ ...p, bio: e.target.value }))}
                  rows={3} placeholder="Brief bio..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Status</label>
                <select value={editing.status || 'active'} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] bg-white">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">Photo</label>
                <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0F766E]/10 file:text-[#0F766E] hover:file:bg-[#0F766E]/20" />
              </div>
              <button onClick={save} disabled={saving}
                className="w-full py-3 bg-[#0F766E] text-white font-semibold text-sm rounded-xl hover:bg-[#0d5f58] disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Doctor</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
