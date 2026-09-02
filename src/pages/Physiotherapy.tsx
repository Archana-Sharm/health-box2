import { useOutletContext } from 'react-router';
import { Zap, Activity, Brain, Dumbbell, Heart, Baby, ArrowRight, CheckCircle } from 'lucide-react';

interface OutletCtx { openModal: () => void; }

const approaches = [
  { icon: Activity, title: 'Manual Therapy', desc: 'Hands-on techniques including joint mobilisation, soft tissue massage, and myofascial release to restore normal movement.' },
  { icon: Zap, title: 'Electrotherapy', desc: 'TENS, IFT, ultrasound, and laser therapy to accelerate tissue healing and provide targeted pain relief.' },
  { icon: Dumbbell, title: 'Exercise Therapy', desc: 'Evidence-based therapeutic exercise programs designed to restore strength, flexibility, and endurance.' },
  { icon: Brain, title: 'Neurological Rehab', desc: 'Specialised programs for stroke recovery, balance disorders, and neurological functional restoration.' },
  { icon: Heart, title: 'Cardiopulmonary Physio', desc: 'Breathing exercises and supervised activity progression for cardiac and respiratory conditions.' },
  { icon: Baby, title: 'Paediatric Therapy', desc: 'Play-based, child-friendly interventions to support developmental milestones and paediatric conditions.' },
];

const process = [
  { step: '01', title: 'Initial Assessment', desc: 'Comprehensive evaluation of your condition, medical history, and functional limitations.' },
  { step: '02', title: 'Personalised Plan', desc: 'A tailored treatment program designed around your diagnosis, goals, and lifestyle.' },
  { step: '03', title: 'Active Treatment', desc: 'Regular supervised therapy sessions combining manual techniques, exercises, and equipment.' },
  { step: '04', title: 'Progress Review', desc: 'Ongoing monitoring and plan adjustments to ensure optimal recovery progress.' },
  { step: '05', title: 'Home Program', desc: 'A structured home exercise program to maintain gains and prevent recurrence.' },
];

const conditions = [
  'Lower back pain', 'Neck pain & cervical spondylosis', 'Shoulder rotator cuff injuries', 'Knee osteoarthritis', 'Post-surgical rehabilitation', 'Stroke & neurological conditions', 'Frozen shoulder (adhesive capsulitis)', 'Sciatica & disc prolapse', 'Sports injuries (ACL, meniscus)', 'Scoliosis & postural correction', 'Plantar fasciitis & foot pain', 'Headaches & migraines',
];

export default function Physiotherapy() {
  const { openModal } = useOutletContext<OutletCtx>();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#172033] py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&h=500&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Specialist Physiotherapy</span>
          <h1 className="font-display text-5xl text-white mb-4">Advanced Physiotherapy Centre</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Evidence-based physiotherapy to restore movement, reduce pain, and rebuild your active life.</p>
          <button onClick={openModal}
            className="mt-8 px-8 py-3.5 bg-[#E52328] text-white font-bold text-sm rounded-xl hover:bg-[#c91d22] inline-flex items-center gap-2">
            Book Physio Session <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Approaches */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#E52328] text-xs font-bold tracking-widest uppercase mb-2 block">Our Techniques</span>
          <h2 className="font-display text-4xl text-[#172033]">Physiotherapy Approaches</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approaches.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-[#E52328]/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-[#E52328]" />
              </div>
              <h3 className="font-display text-lg text-[#172033] mb-2">{title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#172033] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-2 block">How It Works</span>
            <h2 className="font-display text-4xl text-white">Your Recovery Journey</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-white/15" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {process.map(({ step, title, desc }) => (
                <div key={step} className="relative text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E52328] text-white font-display text-xl flex items-center justify-center mx-auto mb-4 relative z-10">
                    {step}
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2">{title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <span className="text-[#E52328] text-xs font-bold tracking-widest uppercase mb-2 block">We Treat</span>
          <h2 className="font-display text-4xl text-[#172033]">Conditions We Address</h2>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {conditions.map((c) => (
            <div key={c} className="flex items-center gap-2.5 text-sm text-[#172033]">
              <CheckCircle size={14} className="text-[#8DC63F] flex-shrink-0" />
              {c}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={openModal}
            className="px-8 py-3.5 bg-[#E52328] text-white font-bold text-sm rounded-xl hover:bg-[#c91d22] inline-flex items-center gap-2">
            Start Your Recovery <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
