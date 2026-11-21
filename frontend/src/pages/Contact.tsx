import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createEnquiry } from "@/lib/api";

const MAX_CHARS = 500;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: "",
      email,
      phone: "",
      subject: "Support Query",
      message: query,
    };

    try {
      await createEnquiry(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-[100dvh] pt-28 pb-24 bg-[#F1F1F4] dark:bg-[#0E1B38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#214AAB] dark:text-[#DDA73A] font-bold uppercase tracking-widest text-xs mb-3 bg-[#D2DFFF] dark:bg-[#102047] px-3.5 py-1.5 rounded-md border border-[#214AAB]/20">
            Legal Inquiries & Helpdesk
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#162F6A] dark:text-white mb-4">
            {t("contact_heading")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("contact_subtext")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info (Left Sidebar) */}
          <div className="space-y-8">
            <div className="bg-[#162F6A] border border-[#DDA73A]/30 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-serif font-bold mb-7 relative z-10 text-white border-b-2 border-[#DDA73A] pb-2 inline-block">
                {t("contact_info_title")}
              </h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DDA73A]/15 border border-[#DDA73A]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#DDA73A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{t("contact_location_title")}</h4>
                    <p className="text-gray-200 text-sm mt-0.5">123 Legal Avenue, Shastri Bhawan Annex<br />New Delhi, ND 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DDA73A]/15 border border-[#DDA73A]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#DDA73A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{t("contact_phone_title")}</h4>
                    <p className="text-gray-200 text-sm mt-0.5">+91 98765 43210<br />+91 11 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DDA73A]/15 border border-[#DDA73A]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#DDA73A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{t("contact_email_title")}</h4>
                    <p className="text-gray-200 text-sm mt-0.5">contact@lexprime.gov.in<br />counsel@lexprime.gov.in</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <h4 className="font-bold text-base mb-1 text-white">{t("contact_hours_title")}</h4>
                <p className="text-gray-300 text-xs whitespace-pre-line leading-relaxed">{t("contact_hours_value")}</p>
              </div>
            </div>
          </div>

          {/* Simple Query Form (Main Content) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-6 sm:p-10 shadow-xl border border-[#EBEAEA] dark:border-white/10 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#162F6A] dark:text-white">{t("contact_sent_title")}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">{t("contact_sent_body")}</p>
                  <button
                    onClick={() => { setSubmitted(false); setQuery(""); setEmail(""); }}
                    className="mt-4 px-6 py-2.5 bg-[#214AAB] text-white rounded-lg hover:bg-[#1A3E94] transition-colors cursor-pointer font-bold text-sm"
                  >
                    {t("contact_send_another")}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-[#D2DFFF] dark:bg-[#102047] border border-[#214AAB]/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#214AAB] dark:text-[#DDA73A]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#162F6A] dark:text-white">{t("contact_form_title")}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-300">Official inquiries are reviewed by our legal secretariat.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#DDA73A]" /> {t("contact_your_email")}
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Query Textarea */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-[#214AAB] dark:text-[#DDA73A]" /> {t("contact_your_query")}
                        </label>
                        <span className={`text-xs font-medium ${query.length > MAX_CHARS * 0.9 ? "text-red-500" : "text-gray-400"}`}>
                          {MAX_CHARS - query.length} {t("contact_chars_left")}
                        </span>
                      </div>
                      <textarea
                        required
                        name="message"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.slice(0, MAX_CHARS))}
                        rows={7}
                        id="contact-query"
                        className="w-full px-3.5 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all resize-none text-sm"
                        placeholder={t("contact_query_placeholder")}
                      />
                      {/* Character progress bar */}
                      <div className="w-full h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all rounded-full ${
                            query.length > MAX_CHARS * 0.9 ? "bg-red-500" : "bg-[#214AAB]"
                          }`}
                          style={{ width: `${(query.length / MAX_CHARS) * 100}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      className="flex items-center justify-center w-full md:w-auto bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#DDA73A]/40 px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-md group cursor-pointer"
                    >
                      {t("contact_send")} <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
