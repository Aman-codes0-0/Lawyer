"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, Calendar, Clock, User, Phone, Mail, FileText,
  CheckCircle2, Info, ShieldCheck, Star, Award, Lock, Sparkles
} from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { useLanguage } from "@/context/LanguageContext";

export default function BookConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, saveProfile, hasProfile } = useUserProfile();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile.name) setName(profile.name);
    if (profile.phone) setPhone(profile.phone);
    if (profile.email) setEmail(profile.email);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    saveProfile({ name, phone, email });

    const data = {
      name,
      phone,
      email,
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
      alert("Error submitting consultation request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="max-w-lg mx-auto py-16 text-center"
            >
              <div className="rounded-3xl border border-gold/30 bg-white/[0.03] backdrop-blur-2xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  {t("consult_success_title")}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {t("consult_success_body")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full py-3.5 rounded-xl bg-gold text-navy font-bold hover:bg-gold-light transition-all shadow-lg hover:shadow-gold/20"
                >
                  {t("consult_submit_another")}
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── FORM & CONTENT LAYOUT ── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* LEFT COLUMN: Premium Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 space-y-8 lg:sticky lg:top-32"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Legal Assistance
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
                    Book Your Legal <span className="text-gold">Consultation</span>
                  </h1>
                  <p className="text-gray-400 text-base mt-4 leading-relaxed">
                    Connect directly with seasoned legal practitioners. Get strategic advice tailored to your personal or corporate legal needs.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-4 pt-2">
                  {[
                    { icon: ShieldCheck, title: "100% Confidentiality Guarantee", desc: "Your attorney-client privilege begins the moment you reach out." },
                    { icon: Award, title: "Experienced Senior Advocates", desc: "Distinguished lawyers with proven track records in high-stakes matters." },
                    { icon: Lock, title: "End-to-End Encryption", desc: "Your personal case information remains strictly private and protected." },
                  ].map(({ icon: Icon, title, desc }, idx) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx + 0.2 }}
                      className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold">{title}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Rating Badge */}
                <div className="p-5 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/10 to-transparent flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-gold mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                      <span className="text-white text-xs font-bold ml-1.5">4.9 / 5.0</span>
                    </div>
                    <p className="text-xs text-gray-400">Trusted by 1,500+ satisfied clients across India</p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: Modern Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

                  {/* Header inside card */}
                  <div className="mb-8 pb-6 border-b border-white/5">
                    <h3 className="text-2xl font-serif font-bold text-white">Consultation Request Form</h3>
                    <p className="text-gray-400 text-xs mt-1">Please provide accurate information for a swift legal response.</p>
                  </div>

                  {/* Pre-filled Banner */}
                  {hasProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 text-gold text-xs font-medium"
                    >
                      <Info className="w-4 h-4 shrink-0" />
                      <span>Pre-filled from your saved profile details. Edit anytime below.</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold" /> {t("consult_name")}
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm"
                          placeholder="e.g. Adv. Vikram Malhotra"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gold" /> {t("consult_phone")}
                        </label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gold" /> {t("consult_email")}
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm"
                          placeholder="vikram@example.com"
                        />
                      </div>

                      {/* Case Type */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-gold" /> {t("consult_case_type")}
                        </label>
                        <input
                          name="caseType"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm"
                          placeholder={t("consult_case_placeholder")}
                        />
                      </div>

                      {/* Preferred Date */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold" /> {t("consult_date")}
                        </label>
                        <input
                          required
                          name="date"
                          type="date"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm [color-scheme:dark]"
                        />
                      </div>

                      {/* Preferred Time */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold" /> {t("consult_time")}
                        </label>
                        <select
                          name="time"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                          <option value="">Select Time Slot</option>
                          <option value="morning">{t("consult_time_morning")}</option>
                          <option value="afternoon">{t("consult_time_afternoon")}</option>
                          <option value="evening">{t("consult_time_evening")}</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-gold" /> {t("consult_message")}
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-sm resize-none"
                          placeholder={t("consult_message_placeholder")}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-base hover:opacity-95 transition-all transform hover:scale-[1.005] shadow-lg shadow-gold/10 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            {t("consult_submit")}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
