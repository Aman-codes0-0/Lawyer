"use client";

import { useState, useEffect } from "react";
import { Scale, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Info } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";
import { useLanguage } from "@/context/LanguageContext";

export default function BookConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const { profile, saveProfile, hasProfile } = useUserProfile();
  const { t } = useLanguage();

  // Local form state for controlled inputs (pre-filled from profile)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(profile.name);
    setPhone(profile.phone);
    setEmail(profile.email);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Save profile details for future visits
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
          <h2 className="text-3xl font-serif font-bold text-[navy] mb-4">{t("consult_success_title")}</h2>
          <p className="text-gray-600 mb-8">
            {t("consult_success_body")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[navy] text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors w-full"
          >
            {t("consult_submit_another")}
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
            {t("consult_heading")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("consult_subtext")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[navy] p-6 sm:p-10 text-white">
            <h3 className="text-2xl font-serif font-bold text-center">{t("consult_form_title")}</h3>
            <p className="text-center text-gray-300 mt-2">{t("consult_confidential")}</p>
          </div>

          {/* Pre-filled banner */}
          {hasProfile && (
            <div className="mx-6 mt-6 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-700 text-sm">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>Your details have been pre-filled from your saved profile. You can edit them below.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[gold]" /> {t("consult_name")}
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[gold]" /> {t("consult_phone")}
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[gold]" /> {t("consult_email")}
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Case Type */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[gold]" /> {t("consult_case_type")}
                </label>
                <input
                  name="caseType"
                  type="text"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all"
                  placeholder={t("consult_case_placeholder")}
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[gold]" /> {t("consult_date")}
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
                  <Clock className="w-4 h-4 text-[gold]" /> {t("consult_time")}
                </label>
                <select name="time" required className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all bg-white">
                  <option value="">{t("consult_time")}</option>
                  <option value="morning">{t("consult_time_morning")}</option>
                  <option value="afternoon">{t("consult_time_afternoon")}</option>
                  <option value="evening">{t("consult_time_evening")}</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[gold]" /> {t("consult_message")}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[gold] focus:ring-1 focus:ring-[gold] outline-none transition-all resize-none"
                  placeholder={t("consult_message_placeholder")}
                ></textarea>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[gold] hover:bg-[gold-light] text-[navy] font-bold text-lg py-4 rounded transition-all transform hover:scale-[1.01] shadow-lg"
              >
                {t("consult_submit")}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
