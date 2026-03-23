import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterDoctor = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a] text-white px-4">
      {/* Heading */}
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-300">
          Access Patient Data Securely
        </h1>
        <p className="text-gray-400">
          View patient records with permission-based access and verify data
          authenticity using zero-knowledge proofs.
        </p>
      </div>

      {/* Form */}
      <RegisterForm role="doctor" />

      {/* Footer Note */}
      <p className="text-gray-500 text-sm mt-6 text-center max-w-md">
        Only patients can grant you access — ensuring complete data privacy and
        trust.
      </p>
    </section>
  );
};

export default RegisterDoctor;
