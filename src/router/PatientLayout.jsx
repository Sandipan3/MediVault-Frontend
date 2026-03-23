import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white overflow-hidden">
      {/*  Glow Effects (background) */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-cyan-400 opacity-20 blur-3xl rounded-full"></div>

      {/*  Main Content */}
      <main className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/*  Footer */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-t border-white/10">
        <Footer />
      </div>
    </section>
  );
};

export default PatientLayout;
