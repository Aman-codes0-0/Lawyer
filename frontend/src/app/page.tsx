"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scale, Shield, Users, Award, Briefcase, FileText, CheckCircle2, Gavel, Home as HomeIcon, Building, Calculator } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
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
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight text-white drop-shadow-lg">
              Experienced Legal <span className="text-gold">Solutions</span>
            </h1>
            <p className="text-2xl text-gray-200 font-serif italic border-l-4 border-gold pl-6 ml-auto mr-auto lg:ml-0 lg:mr-0 inline-block">
              Protecting Your Rights With Confidence
            </p>
            <p className="text-xl max-w-2xl text-gray-100 font-medium leading-relaxed mx-auto lg:mx-0 drop-shadow-md">
              Professional legal representation for individuals, businesses, and families. We fight for the justice you deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/book-consultation"
                className="glow-effect bg-gold hover:bg-gold-light text-navy px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/20 text-lg w-full sm:w-auto text-center"
              >
                Book Consultation
              </Link>
              <Link 
                href="/about"
                className="border border-gold text-gold hover:bg-gold hover:text-navy px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1 text-lg w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 hidden lg:block relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
             <Image 
                src="https://images.unsplash.com/photo-1505664177941-eb6ea0c0ba67?q=80&w=1000&auto=format&fit=crop"
                alt="Law Firm Library"
                fill
                className="object-cover"
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
        className="glass-light dark:bg-[#0A0A0A] py-16 -mt-16 relative z-30 mx-4 lg:mx-auto max-w-6xl rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 backdrop-blur-xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { icon: Award, stat: "20+", label: "Years Experience" },
            { icon: Briefcase, stat: "5000+", label: "Cases Handled" },
            { icon: Scale, stat: "98%", label: "Success Rate" },
            { icon: Users, stat: "10+", label: "Expert Lawyers" },
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
              <p className="text-gray-900 font-bold uppercase tracking-wider text-sm dark:text-gray-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Practice Areas */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">Our Practice Areas</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-900 font-medium dark:text-gray-300">Comprehensive legal expertise across multiple disciplines to serve all your legal needs.</p>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Criminal Law", icon: <Gavel className="w-10 h-10 text-gold" /> },
              { title: "Civil Litigation", icon: <Scale className="w-10 h-10 text-gold" /> },
              { title: "Family Law", icon: <Users className="w-10 h-10 text-gold" /> },
              { title: "Property Law", icon: <HomeIcon className="w-10 h-10 text-gold" /> },
              { title: "Corporate Law", icon: <Building className="w-10 h-10 text-gold" /> },
              { title: "Tax Law", icon: <Calculator className="w-10 h-10 text-gold" /> },
            ].map((area, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={`/practice-areas`} className="block group bg-white dark:bg-[#111] p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden animated-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="mb-6 relative inline-block">
                    <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">{area.icon}</div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3 group-hover:text-gold transition-colors">{area.title}</h3>
                  <p className="text-gray-900 font-medium mb-8 leading-relaxed dark:text-gray-300">Expert representation and strategic advice tailored to your specific situation.</p>
                  <div className="flex items-center text-sm font-bold text-navy group-hover:text-gold">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="relative h-[700px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] group">
              <Image 
                src="https://images.unsplash.com/photo-1555374018-13a8994ab241?q=80&w=1000&auto=format&fit=crop"
                alt="Law Firm Team"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">The LexPrime Advantage</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy">
                  Why Choose Us?
                </h2>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-xl text-gray-900 font-medium leading-relaxed dark:text-gray-300">
                We combine deep legal expertise with a commitment to achieving the best possible outcomes for our clients.
              </motion.p>
              
              <ul className="space-y-6">
                {[
                  "Experienced Lawyers",
                  "Personalized Strategy",
                  "Transparent Fees",
                  "Confidential Consultation",
                  "Proven Results"
                ].map((feature, i) => (
                  <motion.li variants={fadeInUp} key={i} className="flex items-center gap-4 text-lg text-navy font-medium bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                    <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div variants={fadeInUp} className="pt-6">
                <Link href="/about" className="inline-flex items-center text-navy font-bold hover:text-gold transition-colors group text-lg border-b-2 border-gold pb-1">
                  Discover Our Firm History
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
        
        <motion.div {...fadeInUp} className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-md">
            Need Legal Advice?
          </h2>
          <p className="text-2xl text-gold font-serif italic">
            Schedule Your Confidential Consultation Today
          </p>
          <div className="pt-8 flex justify-center">
             <Link 
              href="/book-consultation"
              className="glow-effect bg-gold hover:bg-gold-light text-navy px-12 py-5 rounded font-bold transition-all transform hover:-translate-y-1 text-xl shadow-2xl hover:shadow-gold/20 flex items-center group"
            >
              Book Appointment
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
