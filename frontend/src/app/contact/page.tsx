"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/enquiries", {
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

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether you need immediate legal representation or have questions about our services, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info (Left Sidebar) */}
          <div className="space-y-8">
            <div className="bg-navy rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">Contact Information</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Office Location</h4>
                    <p className="text-gray-300">123 Legal Avenue, Suite 400<br/>New Delhi, ND 110001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-gray-300">+91 98765 43210<br/>+91 11 2345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-gray-300">contact@lexprime.com<br/>careers@lexprime.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <h4 className="font-bold text-lg mb-2">Office Hours</h4>
                <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday & Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form (Main Content) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                  <h3 className="text-3xl font-serif font-bold text-navy">Message Sent Successfully!</h3>
                  <p className="text-gray-600 max-w-md">Thank you for contacting us. A member of our team will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-serif font-bold text-navy mb-8">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Full Name</label>
                        <input required name="name" type="text" className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                        <input required name="email" type="email" className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Subject</label>
                        <input required name="subject" type="text" className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-gray-700">Message</label>
                        <textarea required name="message" rows={5} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="flex items-center justify-center w-full md:w-auto bg-navy hover:bg-[#152238] text-white px-10 py-4 rounded font-bold transition-all shadow-md group">
                      Send Message <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
