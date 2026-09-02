import { useOutletContext } from 'react-router';
import {
  Stethoscope, Brain, Dumbbell, Activity, Baby, Zap,
  HeartPulse, PersonStanding, Wind, Bone, Footprints, StretchHorizontal
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

interface OutletCtx { openModal: () => void; }

const services = [
  {
    icon: Stethoscope,
    title: 'General OPD Consultations',
    description: 'Comprehensive consultations for common illnesses, chronic conditions, and preventive health check-ups by experienced general physicians.',
    benefits: ['Diagnosis & treatment planning', 'Chronic disease management', 'Health screenings & check-ups'],
    color: '#E52328',
  },
  {
    icon: Bone,
    title: 'Orthopedic & Joint Physiotherapy',
    description: 'Specialized rehabilitation for joint injuries, arthritis, fractures, and musculoskeletal disorders using advanced manual and exercise therapy.',
    benefits: ['Joint pain relief', 'Post-fracture rehabilitation', 'Arthritis management'],
    color: '#8DC63F',
  },
  {
    icon: Brain,
    title: 'Neuro Rehabilitation',
    description: 'Expert neurological physiotherapy for stroke, Parkinson\'s, cerebral palsy, and spinal cord injury recovery programs.',
    benefits: ['Stroke recovery programs', 'Balance & coordination', 'Functional independence'],
    color: '#FBC011',
  },
  {
    icon: Dumbbell,
    title: 'Sports Injury Rehabilitation',
    description: 'Rapid, athlete-centred rehabilitation protocols designed to return players to peak performance safely and efficiently.',
    benefits: ['ACL & ligament repair', 'Return-to-sport programs', 'Injury prevention screening'],
    color: '#E52328',
  },
  {
    icon: Activity,
    title: 'Pain Management',
    description: 'Multi-modal pain relief using dry needling, TENS, ultrasound therapy, and manual techniques for acute and chronic pain.',
    benefits: ['Back & neck pain', 'Chronic pain programs', 'Electrotherapy'],
    color: '#FBC011',
  },
  {
    icon: HeartPulse,
    title: 'Post-operative Rehabilitation',
    description: 'Structured post-surgery recovery programs to restore strength, mobility, and function following orthopaedic or neurological surgeries.',
    benefits: ['Hip & knee replacement rehab', 'Spinal surgery recovery', 'Scar tissue management'],
    color: '#8DC63F',
  },
  {
    icon: PersonStanding,
    title: "Women's Health Physiotherapy",
    description: 'Specialist care for pelvic floor dysfunction, pre/post-natal conditions, osteoporosis, and women\'s musculoskeletal health.',
    benefits: ['Pelvic floor rehabilitation', 'Prenatal physiotherapy', 'Post-natal recovery'],
    color: '#E52328',
  },
  {
    icon: Baby,
    title: 'Pediatric Physiotherapy',
    description: 'Child-friendly therapeutic interventions for developmental delays, congenital conditions, and paediatric neurological disorders.',
    benefits: ['Developmental milestone support', 'Cerebral palsy therapy', 'Posture correction'],
    color: '#8DC63F',
  },
  {
    icon: HeartPulse,
    title: 'Cardiac Rehabilitation',
    description: 'Supervised exercise programs and lifestyle counselling for patients recovering from cardiac events or surgery.',
    benefits: ['Post-cardiac event recovery', 'Exercise prescription', 'Lifestyle modification'],
    color: '#FBC011',
  },
  {
    icon: Wind,
    title: 'Pulmonary Rehabilitation',
    description: 'Breathing exercises and respiratory physiotherapy for COPD, asthma, and post-COVID pulmonary conditions.',
    benefits: ['Breathing exercises', 'Post-COVID recovery', 'COPD management'],
    color: '#E52328',
  },
  {
    icon: Footprints,
    title: 'Geriatric Physiotherapy',
    description: 'Falls prevention, mobility improvement, and quality-of-life programs specifically designed for elderly patients.',
    benefits: ['Falls prevention', 'Mobility enhancement', 'Joint flexibility'],
    color: '#8DC63F',
  },
  {
    icon: StretchHorizontal,
    title: 'Posture & Ergonomic Correction',
    description: 'Assessment and correction of postural imbalances caused by desk work, prolonged sitting, or musculoskeletal misalignment.',
    benefits: ['Workplace ergonomics', 'Postural re-education', 'Core strengthening'],
    color: '#FBC011',
  },
];

export default function Services() {
  const { openModal } = useOutletContext<OutletCtx>();

  return (
    <div>
      <section className="relative bg-[#172033] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">What We Offer</span>
          <h1 className="font-display text-5xl text-white mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Comprehensive medical and physiotherapy services tailored to your individual needs.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} onBook={openModal} accent={s.color} />
          ))}
        </div>
      </section>

      <section className="bg-[#E52328] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-white mb-3">Not Sure Which Service You Need?</h2>
          <p className="text-red-50 text-sm mb-6">Our team will assess your condition and recommend the most appropriate treatment plan.</p>
          <button onClick={openModal}
            className="px-8 py-3.5 bg-[#8DC63F] text-[#172033] font-bold text-sm rounded-xl hover:bg-[#75b131]">
            Book a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
