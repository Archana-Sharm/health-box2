import { useOutletContext } from 'react-router';
import { Wifi, Car, Accessibility, Coffee, FlaskConical, Zap, Shield, Users, ArrowRight } from 'lucide-react';

interface OutletCtx { openModal: () => void; }

const facilities = [
  { icon: FlaskConical, title: 'In-house Diagnostics', desc: 'On-site pathology, ECG, and basic radiology for rapid, accurate diagnosis without external referrals.', img: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=400&h=250&fit=crop&auto=format' },
  { icon: Zap, title: 'Advanced Physio Suite', desc: 'Fully equipped physiotherapy facility with ultrasound, TENS, laser therapy, and hydrotherapy equipment.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&auto=format' },
  { icon: Shield, title: 'Sterile Treatment Rooms', desc: 'NABH-compliant sanitization protocols in all consultation and treatment rooms for your safety.', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop&auto=format' },
  { icon: Accessibility, title: 'Accessible Design', desc: 'Fully wheelchair-accessible premises with ramps, wide corridors, and accessible washrooms.', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&auto=format' },
  { icon: Car, title: 'Ample Parking', desc: 'Secure, well-lit parking for 50+ vehicles, with reserved spaces for differently-abled patients.', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=250&fit=crop&auto=format' },
  { icon: Wifi, title: 'Digital Health Records', desc: 'Paperless record management — access your prescriptions, test results, and appointments online.', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop&auto=format' },
  { icon: Coffee, title: 'Patient Lounge', desc: 'A comfortable, air-conditioned waiting area with refreshments, Wi-Fi, and a children\'s corner.', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop&auto=format' },
  { icon: Users, title: 'Dedicated Care Coordinator', desc: 'A personal care coordinator ensures seamless communication between departments and with your family.', img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop&auto=format' },
];

const certifications = ['NABH Accredited Facility', 'ISO 9001:2015 Certified', 'State Health Dept. Licensed', 'Fire Safety Compliant', 'Biomedical Waste Compliant'];

export default function Highlights() {
  const { openModal } = useOutletContext<OutletCtx>();

  return (
    <div>
      <section className="bg-[#172033] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#8DC63F] text-xs font-bold tracking-widest uppercase mb-3 block">Our Facilities</span>
          <h1 className="font-display text-5xl text-white mb-4">Highlights & Facilities</h1>
          <p className="text-gray-300 text-lg">State-of-the-art infrastructure designed around patient comfort and clinical excellence.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map(({ icon: Icon, title, desc, img }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 group">
              <div className="overflow-hidden h-40 bg-gray-100">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="w-10 h-10 rounded-xl bg-[#E52328]/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#E52328]" />
                </div>
                <h3 className="font-display text-base text-[#172033] mb-1.5">{title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-[#172033] mb-8">Accreditations & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((c) => (
              <span key={c} className="px-5 py-2.5 bg-[#8DC63F]/15 text-[#172033] text-sm font-semibold rounded-full border border-[#8DC63F]/25">
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8DC63F] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-[#172033] mb-3">Visit Our Facility</h2>
          <p className="text-[#172033]/70 text-sm mb-6">See our world-class facilities in person. Book an appointment or visit us for a tour.</p>
          <button onClick={openModal}
            className="px-8 py-3.5 bg-[#E52328] text-white font-bold text-sm rounded-xl hover:bg-[#c91d22] inline-flex items-center gap-2">
            Book Appointment <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
