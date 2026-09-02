import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { Link } from 'react-router';
import {
  ArrowRight, Heart, Shield, Users, Star, ChevronRight,
  Activity, Brain, Dumbbell, Baby, Stethoscope, Zap,
  CheckCircle, Award, Clock, Phone, MapPin, ExternalLink
} from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { publicApi } from '../api/endpoints';

interface OutletCtx { openModal: () => void; }

const stats = [
  { value: '10,000+', label: 'Happy Patients' },
  { value: '15+', label: 'Expert Doctors' },
  { value: '8+', label: 'Years of Service' },
  { value: '98%', label: 'Patient Satisfaction' },
];

const highlights = [
  { icon: Shield, title: 'Expert Care', desc: 'Board-certified specialists with decades of experience.' },
  { icon: Heart, title: 'Patient First', desc: 'Every treatment plan is personalised to your unique needs.' },
  { icon: Activity, title: 'Advanced Tech', desc: 'Latest diagnostic and therapeutic equipment available.' },
  { icon: CheckCircle, title: 'Proven Results', desc: 'Thousands of successful recoveries and treatments.' },
];

const services = [
  { icon: Stethoscope, title: 'General OPD', color: '#0F766E' },
  { icon: Brain, title: 'Neuro Rehab', color: '#7C3AED' },
  { icon: Dumbbell, title: 'Sports Injury', color: '#E63946' },
  { icon: Activity, title: 'Pain Management', color: '#F59E0B' },
  { icon: Baby, title: 'Pediatric Care', color: '#EC4899' },
  { icon: Zap, title: 'Physiotherapy', color: '#0F766E' },
];

const fallbackDoctors = [
  { id: '1', name: 'Dr. Priya Sharma', qualification: 'MBBS, MD (General Medicine)', specialty: 'General Physician', experience: '12 years', description: 'Dedicated to comprehensive patient care with a gentle approach.', photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&auto=format' },
  { id: '2', name: 'Dr. Rahul Verma', qualification: 'BPT, MPT (Ortho)', specialty: 'Physiotherapist', experience: '9 years', description: 'Specialist in orthopedic and sports rehabilitation.', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format' },
  { id: '3', name: 'Dr. Anita Patel', qualification: 'MBBS, MS (Ortho)', specialty: 'Orthopedic Surgeon', experience: '14 years', description: 'Expert in joint replacement and minimally invasive procedures.', photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&auto=format' },
];

export default function Home() {
  const { openModal } = useOutletContext<OutletCtx>();
  const [doctors, setDoctors] = useState(fallbackDoctors);

  useEffect(() => {
    publicApi.doctors()
      .then((r) => { if (r.data?.length) setDoctors(r.data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#172033] overflow-hidden min-h-[88vh] flex items-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0F766E]/20 blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#A8D52A]/10 blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A8D52A]/15 text-[#A8D52A] text-xs font-semibold rounded-full mb-6 border border-[#A8D52A]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8D52A] animate-pulse" />
              Advanced Healthcare & Physiotherapy
            </span>
            <h1 className="font-display text-5xl lg:text-6xl text-white leading-tight mb-6">
              Your Health,<br />
              <span className="text-[#A8D52A]">Our Commitment</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Expert medical care and advanced physiotherapy under one roof. From diagnosis to recovery, we're with you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={openModal}
                className="px-7 py-3.5 bg-[#A8D52A] text-[#172033] font-bold text-sm rounded-xl hover:bg-[#96c023] shadow-lg shadow-[#A8D52A]/25 flex items-center gap-2">
                Book Appointment <ArrowRight size={16} />
              </button>
              <Link to="/services"
                className="px-7 py-3.5 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/8 flex items-center gap-2">
                Explore Services <ChevronRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-[#A8D52A]">{s.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image + trust cards */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=600&fit=crop&auto=format"
                alt="Modern healthcare facility"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/40 via-transparent to-transparent" />
            </div>
            {/* Trust cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 w-48">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#A8D52A]/20 flex items-center justify-center">
                  <Star size={14} className="text-[#A8D52A] fill-[#A8D52A]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#172033]">4.9 / 5.0</div>
                  <div className="text-[10px] text-gray-400">Patient Rating</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => <Star key={i} size={10} className="text-[#F4C430] fill-[#F4C430]" />)}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#0F766E] text-white rounded-2xl shadow-xl p-4 w-44">
              <div className="text-2xl font-display mb-1">15+</div>
              <div className="text-xs text-teal-100">Specialist Doctors Available</div>
              <div className="flex items-center gap-1 mt-2">
                <Clock size={10} className="text-[#A8D52A]" />
                <span className="text-[10px] text-teal-200">Now Accepting Patients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#0F766E]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#172033] text-sm mb-1">{title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">What We Offer</span>
          <h2 className="font-display text-4xl text-[#172033]">Our Services</h2>
          <p className="text-[#64748B] mt-3 max-w-xl mx-auto text-sm">Comprehensive healthcare covering general medicine, specialties, and advanced physiotherapy.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {services.map(({ icon: Icon, title, color }) => (
            <Link to="/services" key={title}
              className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-[#172033]">{title}</span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#0F766E] text-[#0F766E] font-semibold text-sm rounded-xl hover:bg-[#0F766E] hover:text-white transition-colors">
            View All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=500&fit=crop&auto=format"
              alt="Our team"
              className="rounded-3xl w-full h-[400px] object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-[#172033] text-white rounded-2xl p-5 shadow-xl max-w-[180px]">
              <div className="font-display text-3xl text-[#A8D52A]">8+</div>
              <div className="text-xs text-gray-300 mt-1">Years of Trusted Healthcare Excellence</div>
            </div>
          </div>
          <div>
            <span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Who We Are</span>
            <h2 className="font-display text-4xl text-[#172033] mb-4">Committed to Your Complete Wellbeing</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-5">
              Health Box Polyclinic & Advance Physiotherapy Center was founded with a singular purpose: to deliver world-class medical and rehabilitative care in a compassionate, patient-centric environment.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              Our multidisciplinary team of physicians and physiotherapists work collaboratively to ensure every patient receives comprehensive, coordinated care from consultation to full recovery.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Award, label: 'Expert Doctors' },
                { icon: Heart, label: 'Patient First' },
                { icon: Shield, label: 'Safe & Trusted' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center p-4 bg-[#F7FAF2] rounded-xl">
                  <Icon size={20} className="text-[#0F766E] mx-auto mb-2" />
                  <span className="text-xs font-semibold text-[#172033]">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white font-semibold text-sm rounded-xl hover:bg-[#0d5f58]">
              Learn More About Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Medical Team</span>
          <h2 className="font-display text-4xl text-[#172033]">Meet Our Doctors</h2>
          <p className="text-[#64748B] mt-3 max-w-xl mx-auto text-sm">Highly experienced specialists dedicated to your health.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onBook={openModal} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/doctors"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#0F766E] text-[#0F766E] font-semibold text-sm rounded-xl hover:bg-[#0F766E] hover:text-white transition-colors">
            View All Doctors <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Mission and values */}
      <section className="bg-[#172033] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <span className="text-[#A8D52A] text-xs font-bold tracking-widest uppercase mb-3 block">Patient-first care</span>
            <h2 className="font-display text-4xl lg:text-5xl mb-5">Healthier outcomes, guided by compassion and clinical expertise.</h2>
            <p className="text-gray-300 leading-relaxed max-w-2xl">At Health Box Polyclinic &amp; Advance Physiotherapy Center, we combine modern medicine, advanced rehabilitation, and human-centered care to support your fullest recovery.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-2xl p-5 bg-white/5"><h3 className="text-xl text-[#A8D52A] mb-2">Mission</h3><p className="text-sm text-gray-300 leading-relaxed">To provide transparent, personalized healthcare that treats the root cause of pain and illness while creating a comfortable, trusting environment for every patient.</p></div>
            <div className="border border-white/10 rounded-2xl p-5 bg-white/5"><h3 className="text-xl text-[#A8D52A] mb-2">Vision</h3><p className="text-sm text-gray-300 leading-relaxed">To remain the most trusted polyclinic and rehabilitation destination in Chinchwad and Pune, known for quality care, warm support, and measurable recovery results.</p></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-20"><h3 className="font-display text-2xl mb-6">Core Values</h3><div className="grid md:grid-cols-3 gap-4">{['Evidence-based treatment planning', 'Respectful, patient-centered communication', 'Holistic recovery through prevention and education'].map((value, index) => <div key={value} className="flex items-center gap-3 text-sm text-gray-300"><span className="w-8 h-8 rounded-full bg-[#0F766E] text-[#A8D52A] flex items-center justify-center font-bold">0{index + 1}</span>{value}</div>)}</div></div>
      </section>

      {/* Specialty services */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12"><span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Our Medical Specialties</span><h2 className="font-display text-4xl text-[#172033]">Services Designed for Complete Wellness</h2><p className="text-[#64748B] mt-3 max-w-xl text-sm">Explore our range of general medical, advanced physiotherapy, and diagnostic offerings.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{[
          ['Orthopedic & Joint Physiotherapy', 'Expert physical therapy for chronic back pain, knee arthritis, shoulder stiffness, neck strain, and post-fracture rehabilitation.', 'Book Session'],
          ['Neuro Rehabilitation', 'Specialized movement training for stroke recovery, paralysis, Parkinson\'s disease, nerve compression, and balance restoration.', 'Book Session'],
          ['General OPD Consultations', 'Comprehensive diagnosis for seasonal fevers, viral infections, diabetes care, hypertension management, and health checkups.', 'Schedule OPD Visit'],
          ['Sports Injury Management', 'Targeted recovery protocols for ligament sprains, muscle tears, tendinitis, kinesio taping, and physical conditioning.', 'Book Rehab'],
          ['Geriatric & Posture Care', 'Gentle mobility training for senior citizens, osteoporosis management, fall prevention, and ergonomic guidance.', 'Consult Therapist'],
          ['Pathology & Blood Tests', 'Full blood count, lipid profile, thyroid testing, blood sugar analysis, and diagnostic laboratory services with digital reports.', 'Book Test'],
        ].map(([title, description, action]) => <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col"><h3 className="font-display text-2xl text-[#172033] mb-3">{title}</h3><p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-5">{description}</p><button onClick={openModal} className="self-start inline-flex items-center gap-2 text-sm font-bold text-[#0F766E] hover:text-[#172033]">{action} <ArrowRight size={14} /></button></div>)}
        </div>
      </section>

      {/* Rehabilitation highlights */}
      <section className="bg-white border-y border-gray-100"><div className="max-w-7xl mx-auto px-4 py-20"><div className="text-center mb-12"><span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Rehabilitation Highlights</span><h2 className="font-display text-4xl text-[#172033]">Specialized Care Programs</h2><p className="text-[#64748B] mt-3 max-w-xl mx-auto text-sm">Continuous advanced therapy programs customized for rapid patient recovery.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{[
        ['Rehab', 'Post-Surgical Knee Rehab', 'Targeted mobility and strength recovery following ACL reconstruction or knee replacement.'],
        ['Spine', 'Spine Alignment Therapy', 'Non-invasive decompression, traction, and core stabilization for lumbar and neck sciatica.'],
        ['Pain Relief', 'Advanced Laser & IFT', 'High-intensity electrotherapy and deep tissue ultrasound for accelerated tissue healing.'],
        ['Sports', 'Rotator Cuff Care', 'Shoulder impingement, frozen shoulder, and overhead athlete physical rehabilitation.'],
        ['Ergonomics', 'IT Posture Correction', 'Ergonomic posture retraining, upper crossed syndrome care, and desk workout guides.'],
        ['Stroke', 'Stroke Recovery Care', 'Neurological gait retraining, muscle re-education, and fine motor skills restoration.'],
      ].map(([label, title, description]) => <div key={title} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md"><span className="text-[10px] font-bold tracking-widest uppercase text-[#E63946]">{label}</span><h3 className="font-display text-xl text-[#172033] mt-2 mb-2">{title}</h3><p className="text-xs text-[#64748B] leading-relaxed mb-4">{description}</p><button onClick={openModal} className="inline-flex items-center gap-2 text-xs font-bold text-[#0F766E]">Learn More <ArrowRight size={13} /></button></div>)}</div></div></section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 py-20"><div className="text-center mb-12"><span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Why Choose Health Box</span><h2 className="font-display text-4xl text-[#172033]">Excellence in Medical Practice &amp; Rehabilitation</h2><p className="text-[#64748B] mt-3 max-w-xl mx-auto text-sm">We combine clinical precision with compassionate support to deliver outstanding patient care.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[
        ['Certified Doctors & Physios', 'Our team comprises experienced medical consultants and certified physical therapists committed to accurate clinical assessment.'],
        ['Advanced Rehabilitation Tech', 'Equipped with modern electrotherapy, ultrasound therapy, TENS, laser therapy, and traction units for effective pain management.'],
        ['Patient-Centric Approach', 'We take the time to listen to your health concerns and design a custom treatment path that fits your routine and goals.'],
        ['Central Chinchwad Location', 'Conveniently situated in Chinchwad, Pune with easy transit access and dedicated patient parking space.'],
        ['Minimal Wait Times', 'Streamlined appointment scheduling to ensure you receive timely attention without extended clinic waiting.'],
        ['Holistic Wellness Focus', 'Focusing not just on immediate pain relief, but on posture education, exercise guidance, and long-term health prevention.'],
      ].map(([title, description]) => <div key={title} className="flex gap-4"><CheckCircle size={20} className="text-[#0F766E] mt-1 flex-shrink-0" /><div><h3 className="font-semibold text-[#172033] text-sm mb-1">{title}</h3><p className="text-xs text-[#64748B] leading-relaxed">{description}</p></div></div>)}</div></section>

      {/* FAQ and location */}
      <section className="bg-[#F7FAF2] border-t border-gray-100"><div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14"><div><span className="text-[#0F766E] text-xs font-bold tracking-widest uppercase mb-2 block">Got Questions?</span><h2 className="font-display text-4xl text-[#172033] mb-8">Frequently Asked Questions</h2><div className="space-y-3">{["Do I need a doctor's referral for Advance Physiotherapy?", 'What are the working hours at Health Box Polyclinic?', 'Are walk-in consultations accepted?', 'Where in Chinchwad is Health Box Polyclinic located?'].map((question) => <details key={question} className="bg-white rounded-xl border border-gray-100 px-5 py-4 group"><summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-[#172033]">{question}<ChevronRight size={16} className="text-[#0F766E] group-open:rotate-90" /></summary><p className="text-xs text-[#64748B] leading-relaxed mt-3">Our care team will be happy to guide you based on your symptoms and treatment needs. Call us to discuss your visit.</p></details>)}</div></div><div className="bg-[#172033] text-white rounded-3xl p-8 lg:p-10"><span className="text-[#A8D52A] text-xs font-bold tracking-widest uppercase mb-2 block">Visit Our Center</span><h2 className="font-display text-3xl mb-6">Convenient Location &amp; Parking</h2><div className="space-y-5 text-sm text-gray-300"><div className="flex gap-3"><MapPin size={18} className="text-[#A8D52A] flex-shrink-0" /><span>Health Box Polyclinic &amp; Advance Physiotherapy Center,<br />Main Road, Chinchwad, Pune, Maharashtra - 411033</span></div><div><strong className="text-white block mb-1">Hours of Operation</strong>Monday - Saturday: 8:00 AM - 9:00 PM<br />Sunday: 9:00 AM - 1:00 PM</div><div><strong className="text-white block mb-1">Get In Touch</strong><a href="tel:+919876543210" className="hover:text-[#A8D52A]">+91 98765 43210</a><br /><a href="mailto:care@healthboxpolyclinic.com" className="hover:text-[#A8D52A]">care@healthboxpolyclinic.com</a></div><p className="text-gray-400 text-xs">Easily accessible from all major roads in Chinchwad &amp; PCMC area with dedicated wheelchair support and patient parking.</p></div><a href="https://share.google/vW9vF8JrIaaMsXNNM" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 px-5 py-3 bg-[#A8D52A] text-[#172033] rounded-xl text-sm font-bold hover:bg-[#96c023]">Open Google Maps <ExternalLink size={14} /></a></div></div></section>

      {/* CTA Banner */}
      <section className="bg-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-4xl text-white mb-4">Ready to Start Your Recovery?</h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto text-sm">Book an appointment today and take the first step towards better health.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={openModal}
              className="px-8 py-3.5 bg-[#A8D52A] text-[#172033] font-bold text-sm rounded-xl hover:bg-[#96c023] shadow-lg">
              Book Appointment
            </button>
            <a href="tel:+919876543210"
              className="px-8 py-3.5 border border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/10 flex items-center gap-2">
              <Phone size={14} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
