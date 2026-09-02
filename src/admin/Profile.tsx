import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Save, Loader2, UserCircle } from 'lucide-react';
import { authApi } from '../api/endpoints';

export default function Profile() {
  const { admin } = useAuth();
  const [form, setForm] = useState({ name: admin?.name || '', email: admin?.email || '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (form.newPassword && form.newPassword !== form.confirmPassword) { setErr('Passwords do not match.'); return; }
    setSaving(true); setMsg(''); setErr('');
    try {
      const payload: Record<string,string> = { name: form.name, email: form.email };
      if (form.newPassword) { payload.currentPassword = form.currentPassword; payload.newPassword = form.newPassword; }
      await authApi.updateProfile(payload);
      setMsg('Profile updated successfully.');
      setForm((p) => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (e: unknown) {
      setErr((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to update profile.');
    } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#172033]">Profile</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Manage your account information.</p>
      </div>

      <div className="max-w-lg">
        {/* Avatar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/15 flex items-center justify-center">
            <UserCircle size={32} className="text-[#0F766E]" />
          </div>
          <div>
            <div className="font-semibold text-[#172033]">{admin?.name || 'Admin'}</div>
            <div className="text-sm text-[#64748B]">{admin?.email}</div>
            <div className="text-xs text-[#A8D52A] font-semibold mt-0.5">{admin?.role || 'Administrator'}</div>
          </div>
        </div>

        {msg && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm mb-4">✓ {msg}</div>}
        {err && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">{err}</div>}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-[#172033] mb-2">Account Details</h2>
          {[
            { k: 'name', label: 'Full Name', type: 'text', ph: 'Your name' },
            { k: 'email', label: 'Email Address', type: 'email', ph: 'admin@healthbox.com' },
          ].map(({ k, label, type, ph }) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">{label}</label>
              <input type={type} value={(form as Record<string,string>)[k]} onChange={(e) => set(k, e.target.value)}
                placeholder={ph}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
            </div>
          ))}

          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#172033] mb-3 text-sm">Change Password</h3>
            {[
              { k: 'currentPassword', label: 'Current Password', ph: '••••••••' },
              { k: 'newPassword', label: 'New Password', ph: '••••••••' },
              { k: 'confirmPassword', label: 'Confirm New Password', ph: '••••••••' },
            ].map(({ k, label, ph }) => (
              <div key={k} className="mb-3">
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">{label}</label>
                <input type="password" value={(form as Record<string,string>)[k]} onChange={(e) => set(k, e.target.value)}
                  placeholder={ph}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]" />
              </div>
            ))}
          </div>

          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#0d5f58] disabled:opacity-60">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}
