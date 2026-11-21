import { Link } from "react-router-dom";
import {
  Scale, ArrowRight, Award, Briefcase, Users,
  CheckCircle2, MapPin, Phone, Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { lawyers } from "@/lib/lawyers-data";

const SERVICE_PILLS = [
  { text: "Corporate Law",       gold: false },
  { text: "Criminal Defense",    gold: true  },
  { text: "Online Consultation", gold: false },
  { text: "Family Law",          gold: true  },
  { text: "Property Disputes",   gold: false },
  { text: "Contract Law",        gold: false },
  { text: "High Court Appeals",  gold: true  },
  { text: "Legal Arbitration",   gold: false },
];

const PRACTICE_AREAS = [
  { icon: Briefcase, title: "Corporate & Commercial",  desc: "Mergers, contracts, compliance and commercial litigation for businesses of all sizes." },
  { icon: Scale,     title: "Criminal Defense",         desc: "Vigorous defense strategies in trial courts, High Courts and the Supreme Court." },
  { icon: Users,     title: "Family & Matrimonial",     desc: "Divorce, custody, adoption and property matters handled with sensitivity." },
  { icon: Award,     title: "Property & Real Estate",   desc: "Title disputes, RERA matters, builder fraud and conveyancing services." },
];

export default function Home() {
  const { t, tArr } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F1F4]">

      {/* ── HERO ── */}
      {settings.showHero && (
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-16 bg-gradient-to-br from-[#162F6A] via-[#102047] to-[#162F6A]">
        {/* Background image overlay */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1400&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-[#162F6A]/70 z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DDA73A]/15 border border-[#DDA73A]/40 text-[#DDA73A] text-xs font-bold uppercase tracking-widest"
          >
            <Scale className="w-4 h-4" /> India's Premier Legal Platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.08]"
          >
            {t("hero_heading").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#DDA73A]">{t("hero_heading").split(" ").at(-1)}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 font-serif italic max-w-2xl mx-auto border-l-4 border-[#DDA73A] pl-5 text-left"
          >
            {t("hero_tagline")}
          </motion.p>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t("hero_subtext")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <Link
              to="/book-consultation"
              className="bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#DDA73A]/40 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl text-center inline-flex items-center justify-center gap-2"
            >
              {t("hero_book")} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-[#DDA73A] text-[#DDA73A] hover:bg-[#DDA73A] hover:text-[#162F6A] px-8 py-4 rounded-xl font-bold text-base transition-all text-center"
            >
              {t("hero_learn")}
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-10 sm:gap-16 pt-6 border-t border-white/10"
          >
            {[
              { icon: Award,     stat: "20+",   label: t("stat_experience") },
              { icon: Briefcase, stat: "5000+", label: t("stat_cases") },
              { icon: Users,     stat: "98%",   label: t("stat_success") },
            ].map((s) => (
              <div key={s.label} className="text-center space-y-1">
                <s.icon className="w-5 h-5 text-[#DDA73A] mx-auto" />
                <p className="font-serif font-bold text-white text-2xl">{s.stat}</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      )}

      {/* ── PRACTICE AREAS ── */}
      {settings.showPracticeAreas && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F1F1F4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#214AAB] font-bold tracking-widest uppercase text-xs mb-2 block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#162F6A]">Practice Areas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRACTICE_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBEAEA] hover:shadow-md hover:border-[#214AAB]/30 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#162F6A]/8 border border-[#162F6A]/15 flex items-center justify-center mb-4 group-hover:bg-[#214AAB] transition-colors">
                  <area.icon className="w-5 h-5 text-[#162F6A] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif font-bold text-[#162F6A] text-base mb-2">{area.title}</h3>
                <p className="text-sm text-[#676B7E] leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── OUR APPROACH + SERVICE PILLS ── */}
      {settings.showApproach && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-t border-[#EBEAEA]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-[#214AAB] font-bold tracking-widest uppercase text-xs block">Our Approach</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#162F6A] leading-snug">
              We combine deep legal expertise with a personalized approach to every case.
            </h2>
            <p className="text-[#676B7E] leading-relaxed">
              At LexPrime, every client receives direct access to senior advocates. We don't pass files down the chain — your matter is handled with the seriousness it deserves.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_PILLS.map((pill, i) => (
                <motion.span
                  key={pill.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border cursor-default ${
                    pill.gold
                      ? "bg-[#DDA73A] text-[#162F6A] border-[#DDA73A]"
                      : "bg-[#214AAB] text-white border-[#214AAB]"
                  }`}
                >
                  {pill.text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Why choose us list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[#214AAB] font-bold tracking-widest uppercase text-xs block">{t("why_tag")}</span>
            <h3 className="text-2xl font-serif font-bold text-[#162F6A]">{t("why_heading")}</h3>
            <p className="text-[#676B7E] text-sm leading-relaxed">{t("why_body")}</p>
            <ul className="space-y-3 mt-2">
              {tArr("why_features").map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#162F6A] font-medium bg-[#F1F1F4] p-3.5 rounded-xl border border-[#EBEAEA]">
                  <CheckCircle2 className="w-5 h-5 text-[#DDA73A] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center text-[#162F6A] font-bold hover:text-[#214AAB] transition-colors group text-sm border-b-2 border-[#DDA73A] pb-0.5 mt-2">
              {t("why_link")} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-[#DDA73A]" />
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      {/* ── TEAM TILES ── */}
      {settings.showTeam && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F1F1F4] border-t border-[#EBEAEA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#214AAB] font-bold tracking-widest uppercase text-xs mb-2 block">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#162F6A]">Meet Our Advocates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.slice(0, 3).map((lawyer, i) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EBEAEA] hover:shadow-md hover:border-[#214AAB]/25 transition-all group"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={lawyer.img}
                    alt={lawyer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102047]/80 via-[#102047]/20 to-transparent" />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#DDA73A]/20 border border-[#DDA73A]/50 px-2.5 py-1 rounded-full">
                    <Award className="w-3 h-3 text-[#DDA73A]" />
                    <span className="text-[9px] font-bold text-[#DDA73A] uppercase tracking-wider">{lawyer.specialization}</span>
                  </div>
                  {/* Experience */}
                  <div className="absolute bottom-3 right-3 bg-[#162F6A]/90 border border-[#DDA73A]/30 px-2.5 py-1 rounded-lg">
                    <span className="text-[#DDA73A] text-xs font-bold">{lawyer.experience}+ yrs</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-[#162F6A] text-lg leading-tight">{lawyer.name}</h3>
                  <p className="text-[#214AAB] text-xs font-bold uppercase tracking-wider mt-1">{lawyer.role}</p>
                  <p className="text-[#676B7E] text-sm mt-2 leading-relaxed line-clamp-2">{lawyer.bio}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EBEAEA]">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#DDA73A] font-bold text-sm">★ {lawyer.rating}</span>
                      <span className="text-[#676B7E] text-xs">({lawyer.reviewCount})</span>
                    </div>
                    <Link
                      to="/team"
                      className="text-xs font-bold text-[#214AAB] hover:text-[#162F6A] transition-colors inline-flex items-center gap-1"
                    >
                      View Profile <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 bg-[#214AAB] hover:bg-[#162F6A] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              View Full Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ── CONTACT STRIP ── */}
      {settings.showContactStrip && (
        <section className="py-10 px-4 sm:px-8 bg-[#F1F1F4] border-t border-[#EBEAEA]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: MapPin, label: "Address",  value: "12, Court Lane, New Delhi – 110001" },
            { icon: Phone, label: "Phone",    value: "+91 11 2345 6789" },
            { icon: Mail,  label: "Email",    value: "info@lexprime.in" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#EBEAEA] shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-[#162F6A]/8 border border-[#162F6A]/15 flex items-center justify-center shrink-0">
                <c.icon className="w-4 h-4 text-[#DDA73A]" />
              </div>
              <div>
                <p className="text-[10px] text-[#676B7E] uppercase tracking-wider font-bold mb-0.5">{c.label}</p>
                <p className="text-sm font-medium text-[#23232A]">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ── CTA ── */}
      {settings.showCtaBanner && (
        <section className="bg-[#162F6A] py-20 relative overflow-hidden border-t border-[#DDA73A]/30 px-4 sm:px-8">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162F6A] via-[#102047]/90 to-[#162F6A]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{t("cta_heading")}</h2>
          <p className="text-xl text-[#DDA73A] font-serif italic">{t("cta_sub")}</p>
          <div className="pt-4">
            <Link
              to="/book-consultation"
              className="bg-[#DDA73A] hover:bg-[#FFC107] text-[#162F6A] px-10 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 text-base shadow-xl inline-flex items-center gap-2"
            >
              {t("cta_button")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      )}

    </div>
  );
}
