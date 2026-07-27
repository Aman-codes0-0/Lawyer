import { Link } from "react-router-dom";
import { ArrowRight, Scale, Users, Award, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SearchBox from "@/components/SearchBox";
import { useLanguage } from "@/context/LanguageContext";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-50px" }
};

export default function Home() {
  const { t, tArr } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] lg:min-h-0 lg:h-[95vh] flex items-center justify-center overflow-hidden py-32 lg:py-0">
        <div className="absolute inset-0 bg-navy/85 z-10" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full mt-20 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight text-white drop-shadow-lg">
              {t("hero_heading").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gold">{t("hero_heading").split(" ").at(-1)}</span>
            </h1>
            <p className="text-2xl text-gray-200 font-serif italic border-l-4 border-gold pl-6 ml-auto mr-auto lg:ml-0 lg:mr-0 inline-block">
              {t("hero_tagline")}
            </p>
            <p className="text-lg sm:text-xl max-w-2xl text-gray-100 font-medium leading-relaxed mx-auto lg:mx-0 drop-shadow-md">
              {t("hero_subtext")}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/book-consultation"
                className="glow-effect bg-gold hover:bg-gold-light text-navy px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/20 text-lg w-full sm:w-auto text-center"
              >
                {t("hero_book")}
              </Link>
              <Link
                to="/about"
                className="border border-gold text-gold hover:bg-gold hover:text-navy px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1 text-lg w-full sm:w-auto text-center"
              >
                {t("hero_learn")}
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 hidden lg:block relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1505664177941-eb6ea0c0ba67?q=80&w=1000&auto=format&fit=crop"
              alt="Law Firm Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

            {/* Glassmorphism Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-8 right-8 glass p-6 rounded-xl flex items-center gap-4 max-w-xs"
            >
              <div className="bg-gold/20 p-3 rounded-full border border-gold/30">
                <Award className="w-8 h-8 text-gold" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Top Rated</p>
                <p className="text-gray-300 text-sm">Law Firm 2026</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-light dark:bg-[#0A0A0A] py-10 sm:py-16 -mt-10 sm:-mt-16 relative z-30 mx-4 lg:mx-auto max-w-6xl rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 backdrop-blur-xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-8">
          {[
            { icon: Award, stat: "20+", labelKey: "stat_experience" as const },
            { icon: Briefcase, stat: "5000+", labelKey: "stat_cases" as const },
            { icon: Scale, stat: "98%", labelKey: "stat_success" as const },
            { icon: Users, stat: "10+", labelKey: "stat_lawyers" as const },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="text-center space-y-3 group"
            >
              <div className="flex justify-center mb-2">
                <item.icon className="h-10 w-10 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-4xl font-bold text-navy font-serif">{item.stat}</h3>
              <p className="text-gray-900 font-bold uppercase tracking-wider text-sm dark:text-gray-300">{t(item.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Find a Lawyer Search Section */}
      <section className="py-20 bg-[#0d1f3c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-[#0d1f3c] to-navy/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-3 block">{t("search_tag")}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t("search_heading")}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t("search_subtext")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBox />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div {...fadeInUp} className="relative h-[400px] sm:h-[700px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] group">
              <img
                src="https://images.unsplash.com/photo-1555374018-13a8994ab241?q=80&w=1000&auto=format&fit=crop"
                alt="Law Firm Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">{t("why_tag")}</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy">
                  {t("why_heading")}
                </h2>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-xl text-gray-900 font-medium leading-relaxed dark:text-gray-300">
                {t("why_body")}
              </motion.p>

              <ul className="space-y-6">
                {tArr("why_features").map((feature, i) => (
                  <motion.li variants={fadeInUp} key={i} className="flex items-center gap-4 text-lg text-navy font-medium bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                    <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={fadeInUp} className="pt-6">
                <Link to="/about" className="inline-flex items-center text-navy font-bold hover:text-gold transition-colors group text-lg border-b-2 border-gold pb-1">
                  {t("why_link")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />

        <motion.div {...fadeInUp} className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-md">
            {t("cta_heading")}
          </h2>
          <p className="text-xl sm:text-2xl text-gold font-serif italic">
            {t("cta_sub")}
          </p>
          <div className="pt-8 flex justify-center">
            <Link
              to="/book-consultation"
              className="glow-effect bg-gold hover:bg-gold-light text-navy px-12 py-5 rounded font-bold transition-all transform hover:-translate-y-1 text-xl shadow-2xl hover:shadow-gold/20 flex items-center group"
            >
              {t("cta_button")}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
