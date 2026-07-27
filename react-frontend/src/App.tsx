import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SplashScreen } from "@/components/SplashScreen";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import BookConsultation from "@/pages/BookConsultation";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAppointments from "@/pages/admin/AdminAppointments";
import AdminEnquiries from "@/pages/admin/AdminEnquiries";
import AdminLawyers from "@/pages/admin/AdminLawyers";

import LawyerLogin from "@/pages/lawyer/LawyerLogin";
import LawyerSignup from "@/pages/lawyer/LawyerSignup";
import LawyerDashboard from "@/pages/lawyer/LawyerDashboard";

export default function App() {
  const location = useLocation();

  // Hide Navbar/Footer for Admin dashboard and Lawyer portal standalone views
  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/lawyer");

  return (
    <>
      <SplashScreen />
      <CustomCursor />

      {!isDashboard && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/practice-areas" element={<Navigate to="/team" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/book-consultation" element={<BookConsultation />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="dashboard/appointments" element={<AdminAppointments />} />
            <Route path="dashboard/enquiries" element={<AdminEnquiries />} />
            <Route path="dashboard/lawyers" element={<AdminLawyers />} />
          </Route>

          {/* Lawyer Routes */}
          <Route path="/lawyer/login" element={<LawyerLogin />} />
          <Route path="/lawyer/signup" element={<LawyerSignup />} />
          <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </>
  );
}
