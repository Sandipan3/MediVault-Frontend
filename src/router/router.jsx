import { createBrowserRouter } from "react-router-dom";
import React from "react";
import BlueSpinner from "../components/BlueSpinner";

// ----- LAZY LOAD EVERYTHING ELSE -----
// Layouts
const AdminLayout = React.lazy(() => import("./AdminLayout"));
const DoctorLayout = React.lazy(() => import("./DoctorLayout"));
const PatientLayout = React.lazy(() => import("./PatientLayout"));

// Protected Route Wrapper
const ProtectedRoute = React.lazy(() => import("../components/ProtectedRoute"));

// Pages
const LandingPage = React.lazy(() => import("../pages/LandingPage"));
const Login = React.lazy(() => import("../pages/Login"));
const RegisterPatient = React.lazy(() => import("../pages/RegisterPatient"));
const RegisterDoctor = React.lazy(() => import("../pages/RegisterDoctor"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));
const DoctorDashboard = React.lazy(() => import("../pages/DoctorDashboard"));
const PatientDashboard = React.lazy(() => import("../pages/PatientDashboard"));

// Small static components
const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center">
    unauthorized
  </div>
);
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    404 - Page not found!
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Public Routes
      { index: true, element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register/patient", element: <RegisterPatient /> },
      { path: "/register/doctor", element: <RegisterDoctor /> },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },

      // Admin only routes - a/
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/a",
            element: <AdminLayout />,
            children: [{ index: true, element: <AdminDashboard /> }],
          },
        ],
      },
      // Doctor only routes - d/
      {
        element: <ProtectedRoute allowedRoles={["doctor"]} />,
        children: [
          {
            path: "/d",
            element: <DoctorLayout />,
            children: [{ index: true, element: <DoctorDashboard /> }],
          },
        ],
      },
      // Patient only routes - p/
      {
        element: <ProtectedRoute allowedRoles={["patient"]} />,
        children: [
          {
            path: "/p",
            element: <PatientLayout />,
            children: [{ index: true, element: <PatientDashboard /> }],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
