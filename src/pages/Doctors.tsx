import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { publicApi } from '../api/endpoints';

interface OutletCtx { openModal: () => void; }

const fallback = [
  { _id: '1', name: 'Dr. Priya Sharma', qualification: 'MBBS, MD (General Medicine)', specialty: 'General Physician', experience: '12 years', description: 'Expert in diagnosing and managing complex medical conditions with a holistic approach to patient care.', photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&auto=format', availableDays: 'Mon–Sat' },
  { _id: '2', name: 'Dr. Rahul Verma', qualification: 'BPT, MPT (Orthopaedics)', specialty: 'Physiotherapist', experience: '9 years', description: 'Specialist in orthopedic rehabilitation and sports injury recovery programs.', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format', availableDays: 'Mon–Sat' },
  { _id: '3', name: 'Dr. Anita Patel', qualification: 'MBBS, MS (Orthopaedics)', specialty: 'Orthopedic Surgeon', experience: '14 years', description: 'Renowned for joint replacement procedures and minimally invasive orthopaedic surgeries.', photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&auto=format', availableDays: 'Tue–Sun' },
  { _id: '4', name: 'Dr. Suresh Nair', qualification: 'BPT, MPT (Neurology)', specialty: 'Neuro Physiotherapist', experience: '11 years', description: 'Dedicated to helping patients recover functional independence after neurological conditions.', photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&auto=format', availableDays: 'Mon–Fri' },
  { _id: '5', name: 'Dr. Meena Joshi', qualification: 'MBBS, DGO', specialty: "Women's Health", experience: '10 years', description: "Specialist in women's health physiotherapy, pelvic floor rehabilitation, and pre/post-natal care.", photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format', availableDays: 'Mon–Sat' },
  { _id: '6', name: 'Dr. Arun Kapoor', qualification: 'BPT, MSPT (Sports)', specialty: 'Sports Physiotherapist', experience: '8 years', description: 'Elite sports rehabilitation specialist working with professional athletes for peak performance recovery.', photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&auto=format', availableDays: 'Mon–Sat' },
];

export default function Doctors() {
  const { openModal } = useOutletContext<OutletCtx>();
  const [doctors, setDoctors] = useState(fallback as typeof fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    publicApi.doctors()
      .then((r) => { if (r.data?.length) setDoctors(r.data); })
      .catch(() => setError(''))
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="bg-[#172033] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Medical Team</span>
          <h1 className="font-display text-5xl text-white mb-4">Our Doctors</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Meet our team of experienced, compassionate specialists.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative max-w-md mx-auto mb-10">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E52328]/30 focus:border-[#E52328] bg-white"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#E52328]" />
            <span className="ml-3 text-[#64748B]">Loading doctors...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-3 py-20 text-red-600">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#64748B]">No doctors found matching "{search}".</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} onBook={openModal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
