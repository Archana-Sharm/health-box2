import { Star, Clock, Award } from 'lucide-react';

interface Doctor {
  _id?: string;
  id?: string;
  name: string;
  qualification: string;
  specialty: string;
  experience: string;
  description?: string;
  photo?: string;
  image?: string;
  consultationFee?: string;
  availableDays?: string;
}

interface Props { doctor: Doctor; onBook?: () => void; }

export default function DoctorCard({ doctor, onBook }: Props) {
  const imgSrc = doctor.photo || doctor.image ||
    `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 group">
      <div className="relative overflow-hidden bg-gray-100">
        <img src={imgSrc} alt={doctor.name} className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-2.5 py-0.5 bg-[#8DC63F] text-[#172033] text-xs font-bold rounded-full">
            {doctor.specialty}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-[#172033] mb-0.5">{doctor.name}</h3>
        <p className="text-[#E52328] text-xs font-semibold mb-3">{doctor.qualification}</p>

        <div className="flex items-center gap-4 text-xs text-[#64748B] mb-3">
          <span className="flex items-center gap-1"><Award size={12} className="text-[#F4C430]" />{doctor.experience}</span>
          {doctor.availableDays && <span className="flex items-center gap-1"><Clock size={12} />{doctor.availableDays}</span>}
        </div>

        {doctor.description && (
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4">{doctor.description}</p>
        )}

        <button
          onClick={onBook}
          className="w-full py-2.5 bg-[#E52328] text-white text-sm font-semibold rounded-xl hover:bg-[#c71a1f] transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
