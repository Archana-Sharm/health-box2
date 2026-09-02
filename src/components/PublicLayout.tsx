import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import AppointmentModal from './AppointmentModal';

export default function PublicLayout() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF2]">
      <Navbar onBookAppointment={() => setModalOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ openModal: () => setModalOpen(true) }} />
      </main>
      <Footer />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
