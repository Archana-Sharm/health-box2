import { useOutletContext } from 'react-router';
import { Award, Heart, Activity, Users, CheckCircle, MapPin, MessageCircle, Shield, Zap, Clock, ArrowRight } from 'lucide-react';

interface OutletCtx { openModal: () => void; }

const reasons = [
  { icon: Award, title: 'Experienced Professionals', desc: 'Our doctors and physiotherapists bring 8–15 years of specialist experience, ensuring expert diagnosis and treatment for every condition.', color: '#FBC011' },
  { icon: Heart, title: 'Patient-Centered Care', desc: 'We listen first. Every consultation begins with understanding your unique concerns, lifestyle, and goals before designing a treatment plan.', color: '#E52328' },
  { icon: Zap, title: 'Advanced Physiotherapy', desc: 'Our physiotherapy department uses cutting-edge techniques including dry needling, ultrasound therapy, and evidence-based exercise programs.', color: '#E52328' },
  { icon: Users, title: 'Multiple Specialties', desc: 'General medicine, orthopaedics, neurology, women\'s health, paediatrics — all under one roof for seamless, coordinated care.', color: '#8DC63F' },
  { icon: CheckCircle, title: 'Personalized Treatment', desc: 'No two patients are the same. We craft individualised treatment plans that address your specific condition, not a textbook protocol.', color: '#8DC63F' },
  { icon: Activity, title: 'Modern Facilities', desc: 'Fully equipped consultation rooms, a dedicated physiotherapy floor, and the latest diagnostic technology for accurate assessments.', color: '#FBC011' },
  { icon: MessageCircle, title: 'Transparent Communication', desc: 'We explain every diagnosis, every treatment step, and every cost clearly — so you are always informed and empowered.', color: '#E52328' },
  { icon: MapPin, title: 'Convenient Location', desc: 'Centrally located with ample parking, public transport access, and extended weekday and weekend hours to fit your schedule.', color: '#8DC63F' },
];

const testimonials = [
  { name: 'Kavitha R.', text: 'After my knee replacement, the physiotherapy team at Health Box got me walking confidently in 6 weeks. Truly exceptional care.', rating: 5 },
  { name: 'Rajan M.', text: 'Dr. Priya took the time to really understand my condition. The treatment plan was thorough and the recovery was faster than expected.', rating: 5 },
  { name: 'Sunita P.', text: "The women's health physiotherapy program changed my quality of life. The staff are professional, warm, and incredibly knowledgeable.", rating: 5 },
];

export default function WhyChooseUs() {
  const { openModal } = useOutletContext<OutletCtx>();

  return (
    <div>
      <section className="bg-[#172033] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Our Difference</span>
          <h1 className="font-display text-5xl text-white mb-4">Why Choose Health Box?</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Eight compelling reasons why thousands of patients trust us with their health.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-display text-lg text-[#172033] mb-2">{title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#E52328] py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '10,000+', l: 'Patients Treated' },
            { n: '98%', l: 'Satisfaction Rate' },
            { n: '15+', l: 'Specialist Doctors' },
            { n: '8+', l: 'Years of Excellence' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="font-display text-4xl text-white mb-1">{n}</div>
              <div className="text-red-100 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#E52328] text-xs font-bold tracking-widest uppercase mb-2 block">Patient Stories</span>
          <h2 className="font-display text-4xl text-[#172033]">What Our Patients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#FBC011] text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-[#172033] leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E52328]/15 flex items-center justify-center text-[#E52328] font-bold text-xs">
                  {t.name[0]}
                </div>
                <span className="text-sm font-semibold text-[#172033]">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#172033] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-white mb-3">Ready to Experience the Difference?</h2>
          <p className="text-gray-400 text-sm mb-6">Join thousands of satisfied patients who chose Health Box for their healthcare journey.</p>
          <button onClick={openModal}
            className="px-8 py-3.5 bg-[#8DC63F] text-[#172033] font-bold text-sm rounded-xl hover:bg-[#75b131] inline-flex items-center gap-2">
            Book Your Appointment <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
