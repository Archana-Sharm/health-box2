import { LucideIcon, ArrowRight } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits?: string[];
  onBook?: () => void;
  accent?: string;
}

export default function ServiceCard({ icon: Icon, title, description, benefits, onBook, accent = '#E52328' }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 p-6 flex flex-col">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${accent}15` }}>
        <Icon size={22} style={{ color: accent }} />
      </div>
      <h3 className="font-display text-lg text-[#172033] mb-2">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{description}</p>
      {benefits && benefits.length > 0 && (
        <ul className="mb-5 space-y-1.5">
          {benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-[#172033]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onBook}
        className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-[#E52328] text-[#E52328] text-sm font-semibold rounded-xl hover:bg-[#E52328] hover:text-white transition-colors group"
      >
        Book Appointment
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
