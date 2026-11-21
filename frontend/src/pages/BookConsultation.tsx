import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, User, Phone, Mail, FileText,
  CheckCircle2, Info, ShieldCheck, Star, Award, Lock, Sparkles
} from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { useLanguage } from "@/context/LanguageContext";
import { createAppointment } from "@/lib/api";

export default function BookConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, saveProfile, hasProfile } = useUserProfile();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [caseType, setCaseType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile.name) setName(profile.name);
    if (profile.phone) setPhone(profile.phone);
    if (profile.email) setEmail(profile.email);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    saveProfile({ name, phone, email });

    const data = {
      name,
      phone,
      email,
      caseType,
      date,
      time,
      message,
    };

    try {
      await createAppointment(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Error submitting consultation request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F1F1F4] dark:bg-[#0E1B38] text-[#23232A] dark:text-white pt-28 pb-20 relative overflow-hidden">
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
              <div className="rounded-2xl border border-[#214AAB]/30 bg-white dark:bg-[#162F6A] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#214AAB]" />
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#162F6A] dark:text-white mb-3">
                  {t("consult_success_title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
                  {t("consult_success_body")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full py-3.5 rounded-lg bg-[#214AAB] hover:bg-[#1A3E94] text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  {t("consult_submit_another")}
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── FORM & CONTENT LAYOUT ── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* LEFT COLUMN: Premium Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 space-y-7 lg:sticky lg:top-32"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#214AAB]/40 bg-[#214AAB]/15 text-[#162F6A] dark:text-[#214AAB] text-xs font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#214AAB]" /> Official Legal Assistance
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#162F6A] dark:text-white leading-tight">
                    Schedule Your Legal <span className="text-[#214AAB] dark:text-[#214AAB]">Consultation</span>
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-base mt-3 leading-relaxed">
                    Connect directly with experienced advocates. Professional legal counsel aligned with High Court and Supreme Court practice standards.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-3.5 pt-1">
                  {[
                    { icon: ShieldCheck, title: "100% Confidentiality Guarantee", desc: "Your attorney-client privilege begins the moment you submit your request." },
                    { icon: Award, title: "Senior Advocates & Counsel", desc: "Seasoned legal practitioners with proven litigation & advisory experience." },
                    { icon: Lock, title: "End-to-End Data Security", desc: "Your case summary is encrypted and processed under strict confidentiality protocols." },
                  ].map(({ icon: Icon, title, desc }, idx) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx + 0.2 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-[#EBEAEA] dark:border-white/10 bg-white dark:bg-[#162F6A] shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#D2DFFF] dark:bg-[#102047] border border-[#214AAB]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-[#214AAB] dark:text-[#214AAB]" />
                      </div>
                      <div>
                        <h4 className="text-[#162F6A] dark:text-white text-sm font-bold">{title}</h4>
                        <p className="text-gray-500 dark:text-gray-300 text-xs mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Rating Badge */}
                <div className="p-4 rounded-xl border border-[#214AAB]/30 bg-white dark:bg-[#162F6A] shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#214AAB] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#214AAB] text-[#214AAB]" />
                      ))}
                      <span className="text-[#162F6A] dark:text-white text-xs font-bold ml-1.5">4.9 / 5.0</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Trusted institutional legal practice across India</p>
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
                <div className="rounded-2xl border border-[#EBEAEA] dark:border-[#214AAB]/30 bg-white dark:bg-[#162F6A] p-6 sm:p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#214AAB] via-[#214AAB] to-[#214AAB]" />

                  {/* Header inside card */}
                  <div className="mb-7 pb-4 border-b border-gray-100 dark:border-white/10">
                    <h3 className="text-2xl font-serif font-bold text-[#162F6A] dark:text-white">Consultation Request Form</h3>
                    <p className="text-gray-500 dark:text-gray-300 text-xs mt-1">Please provide accurate information for quick legal processing.</p>
                  </div>

                  {/* Pre-filled Banner */}
                  {hasProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-center gap-3 bg-[#D2DFFF] dark:bg-[#102047] border border-[#214AAB]/30 rounded-lg px-4 py-3 text-[#162F6A] dark:text-[#A3BBF3] text-xs font-medium"
                    >
                      <Info className="w-4 h-4 shrink-0 text-[#214AAB]" />
                      <span>Pre-filled from your saved profile details. Edit anytime below.</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_name")}
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                          placeholder="e.g. Adv. Vikram Malhotra"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_phone")}
                        </label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_email")}
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                          placeholder="vikram@example.com"
                        />
                      </div>

                      {/* Case Type */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_case_type")}
                        </label>
                        <input
                          name="caseType"
                          type="text"
                          value={caseType}
                          onChange={(e) => setCaseType(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                          placeholder={t("consult_case_placeholder")}
                        />
                      </div>

                      {/* Preferred Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_date")}
                        </label>
                        <input
                          required
                          name="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                        />
                      </div>

                      {/* Preferred Time */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_time")}
                        </label>
                        <select
                          name="time"
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                          <option value="">Select Time Slot</option>
                          <option value="morning">{t("consult_time_morning")}</option>
                          <option value="afternoon">{t("consult_time_afternoon")}</option>
                          <option value="evening">{t("consult_time_evening")}</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#214AAB]" /> {t("consult_message")}
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm resize-none"
                          placeholder={t("consult_message_placeholder")}
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-lg bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#214AAB]/40 font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
