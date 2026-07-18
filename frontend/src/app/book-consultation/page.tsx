"use client";

import { useState } from "react";
import { Scale, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";

export default function BookConsultation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      caseType: formData.get("caseType"),
      date: formData.get("date"),
      time: formData.get("time"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fdfdfd] py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl text-center border-t-4 border-[gold]">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[navy] mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. One of our legal experts will review your request and contact you shortly to confirm your appointment time.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-[navy] text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Scale className="h-12 w-12 text-[gold] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[navy] mb-6">
            Book a Consultation
          </h1>
          <p className="text-xl text-gray-600">
            Take the first step towards resolving your legal matter. Provide us with some basic information, and we will get back to you promptly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[navy] p-6 sm:p-10 text-white">
            <h3 className="text-2xl font-serif font-bold text-center">Consultation Form</h3>
            <p className="text-center text-gray-300 mt-2">All information is kept strictly confidential.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[gold]" /> Full Name
                </label>
                <input 
                  required 
                  name="name"
                  type="text" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[gold]" /> Phone Number
                </label>
                <input 
                  required 
                  name="phone"
                  type="tel" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[gold]" /> Email Address
                </label>
                <input 
                  required 
                  name="email"
                  type="email" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Practice Area */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[gold]" /> Area of Law
                </label>
                <select name="caseType" required className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all bg-white">
                  <option value="">Select a Practice Area</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="family">Family & Divorce</option>
                  <option value="criminal">Criminal Defense</option>
                  <option value="property">Property Disputes</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[gold]" /> Preferred Date
                </label>
                <input 
                  required 
                  name="date"
                  type="date" 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[gold]" /> Preferred Time
                </label>
                <select name="time" required className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all bg-white">
                  <option value="">Select a Time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 7 PM)</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[gold]" /> Brief Description of Your Case
                </label>
                <textarea 
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all resize-none"
                  placeholder="Please provide a brief overview of your legal situation..."
                ></textarea>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-[gold] hover:bg-[gold-light] text-[navy] font-bold text-lg py-4 rounded transition-all transform hover:scale-[1.01] shadow-lg"
              >
                Request Appointment
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
