import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPatient = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a] text-white px-4">
      {/* Heading */}
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-300">
          Secure Your Medical Records
        </h1>
        <p className="text-gray-400">
          Store, manage, and share your health reports with full control using
          blockchain-powered privacy.
        </p>
      </div>

      {/* Form */}
      <RegisterForm role="patient" />

      {/* Footer Note */}
      <p className="text-gray-500 text-sm mt-6 text-center max-w-md">
        Your data stays encrypted and accessible only with your permission.
      </p>
    </section>
  );
};

export default RegisterPatient;
