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
    <div className="min-h-[100dvh] pt-28 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            {t("contact_heading")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t("contact_subtext")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info (Left Sidebar) */}
          <div className="space-y-8">
            <div className="bg-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">{t("contact_info_title")}</h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact_location_title")}</h4>
                    <p className="text-gray-300">123 Legal Avenue, Suite 400<br />New Delhi, ND 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact_phone_title")}</h4>
                    <p className="text-gray-300">+91 98765 43210<br />+91 11 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t("contact_email_title")}</h4>
                    <p className="text-gray-300">contact@lexprime.com<br />careers@lexprime.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <h4 className="font-bold text-lg mb-2">{t("contact_hours_title")}</h4>
                <p className="text-gray-300 whitespace-pre-line">{t("contact_hours_value")}</p>
              </div>
            </div>
          </div>

          {/* Simple Query Form (Main Content) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-12 shadow-sm border border-gray-100 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                  <h3 className="text-3xl font-serif font-bold text-navy">{t("contact_sent_title")}</h3>
                  <p className="text-gray-600 max-w-md">{t("contact_sent_body")}</p>
                  <button
                    onClick={() => { setSubmitted(false); setQuery(""); setEmail(""); }}
                    className="mt-6 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {t("contact_send_another")}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-navy">{t("contact_form_title")}</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold" /> {t("contact_your_email")}
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Query Textarea */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-gold" /> {t("contact_your_query")}
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
                        rows={8}
                        id="contact-query"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                        placeholder={t("contact_query_placeholder")}
                      />
                      {/* Character progress bar */}
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all rounded-full ${
                            query.length > MAX_CHARS * 0.9 ? "bg-red-400" : "bg-gold"
                          }`}
                          style={{ width: `${(query.length / MAX_CHARS) * 100}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      className="flex items-center justify-center w-full md:w-auto bg-navy hover:bg-[#152238] text-white px-10 py-4 rounded-lg font-bold transition-all shadow-md group cursor-pointer"
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
