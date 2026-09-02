import { useOutletContext } from 'react-router';
import { Heart, Eye, Target, Users, Shield, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface OutletCtx { openModal: () => void; }

const values = [
  { icon: Heart, title: 'Compassion', desc: 'We treat every patient with kindness, empathy, and dignity.' },
  { icon: Shield, title: 'Integrity', desc: 'Honest, transparent communication guides every interaction.' },
  { icon: Star, title: 'Excellence', desc: 'We pursue the highest standards in clinical care and service.' },
  { icon: Users, title: 'Collaboration', desc: 'Our multidisciplinary team works together for holistic healing.' },
];

const whyUs = [
  'Board-certified physicians and physiotherapists',
  'State-of-the-art diagnostic and treatment equipment',
  'Personalized treatment plans for every patient',
  'Comprehensive care from diagnosis to rehabilitation',
  'Warm, welcoming environment focused on patient comfort',
  'Transparent billing with no hidden charges',
];

export default function About() {
  const { openModal } = useOutletContext<OutletCtx>();

  return (
    <div>
      <section className="relative bg-[#172033] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#172033] to-[#E52328]/35" />
        <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&h=400&fit=crop&auto=format" alt="About us" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Our Story</span>
          <h1 className="font-display text-5xl text-white mb-4">About Health Box</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Over 8 years of dedicated healthcare excellence, earning the trust of thousands of patients.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-[#E52328] text-xs font-bold tracking-widest uppercase mb-2 block">Who We Are</span>
          <h2 className="font-display text-4xl text-[#172033] mb-5">A Legacy of Care and Healing</h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Founded in 2016, Health Box Polyclinic & Advance Physiotherapy Center began as a small clinic with a big vision — to make quality healthcare accessible, affordable, and compassionate for every patient who walks through our doors.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Today, we've grown into a full-service medical facility offering general OPD consultations, specialist care, and one of the most advanced physiotherapy departments in the region. Our team of 15+ doctors and therapists has collectively helped over 10,000 patients reclaim their health.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-6">
            We believe healthcare is not just a service — it's a relationship built on trust, expertise, and genuine concern for the wellbeing of each individual.
          </p>
          <ul className="space-y-2 mb-6">
            {whyUs.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#172033]">
                <CheckCircle size={14} className="text-[#8DC63F] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=500&fit=crop&auto=format" alt="Healthcare team" className="rounded-3xl w-full h-[420px] object-cover shadow-xl" />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5">
            <div className="font-display text-3xl text-[#E52328]">10,000+</div>
            <div className="text-xs text-gray-500 mt-1">Patients Treated</div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-[#E52328] rounded-3xl p-8 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
              <Target size={22} />
            </div>
            <h3 className="font-display text-2xl mb-3">Our Mission</h3>
            <p className="text-red-50 text-sm leading-relaxed">
              To provide compassionate, evidence-based medical and physiotherapy care that empowers patients to achieve their best possible health outcomes — delivered with respect, transparency, and clinical excellence.
            </p>
          </div>
          <div className="bg-[#172033] rounded-3xl p-8 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
              <Eye size={22} />
            </div>
            <h3 className="font-display text-2xl mb-3">Our Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To be the most trusted and comprehensive healthcare provider in our community — a place where every patient, regardless of background, receives world-class care with warmth and dignity.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#E52328] text-xs font-bold tracking-widest uppercase mb-2 block">What Drives Us</span>
          <h2 className="font-display text-4xl text-[#172033]">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-2xl bg-[#E52328]/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-[#E52328]" />
              </div>
              <h3 className="font-display text-xl text-[#172033] mb-2">{title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#8DC63F] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-[#172033] mb-3">Experience the Health Box Difference</h2>
          <p className="text-[#172033]/70 mb-7 text-sm">Book an appointment and see why thousands of patients choose us for their healthcare needs.</p>
          <button onClick={openModal}
            className="px-8 py-3.5 bg-[#E52328] text-white font-bold text-sm rounded-xl hover:bg-[#c91d22] inline-flex items-center gap-2">
            Book Appointment <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
