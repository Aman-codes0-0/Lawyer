import { Target, Scale, History } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-[100dvh] pt-28 pb-24 bg-[#F1F1F4] dark:bg-[#0E1B38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#214AAB] dark:text-[#214AAB] font-bold uppercase tracking-widest text-xs mb-3 bg-[#D2DFFF] dark:bg-[#102047] px-3.5 py-1.5 rounded-md border border-[#214AAB]/20">
            Institutional Background
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#162F6A] dark:text-white mb-4">
            About Our Legal Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded on principles of constitutional fidelity, professional integrity, and institutional legal advisory.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[380px] sm:h-[520px] rounded-2xl overflow-hidden shadow-xl border border-[#EBEAEA] dark:border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=1000&auto=format&fit=crop"
              alt="Law Firm Office"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-[#162F6A] dark:text-[#214AAB] font-bold uppercase tracking-widest text-xs bg-[#214AAB]/15 px-3 py-1 rounded-md border border-[#214AAB]/30">
              <History className="w-4 h-4 text-[#214AAB]" /> Established Track Record
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162F6A] dark:text-white">
              Over Two Decades of Legal Excellence
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Since our establishment in 2004, LexPrime has been at the forefront of complex legal matters, representing clients across High Courts, Appellate Tribunals, and the Supreme Court of India.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our firm operates strictly within the highest professional standards of the Bar Council of India, ensuring dedicated, strategic, and transparent legal consultation.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#162F6A] border border-[#214AAB]/30 p-8 sm:p-10 rounded-2xl text-white shadow-xl">
            <Target className="w-10 h-10 text-[#214AAB] mb-5" />
            <h3 className="text-2xl font-serif font-bold mb-3 text-white">Our Mission</h3>
            <p className="text-gray-200 text-base leading-relaxed">
              To deliver strategic, ethical, and result-oriented legal counsel that protects the rights and assets of our clients through rigorous statutory analysis and dedicated courtroom advocacy.
            </p>
          </div>
          <div className="bg-white dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/10 p-8 sm:p-10 rounded-2xl text-[#162F6A] dark:text-white shadow-xl">
            <Scale className="w-10 h-10 text-[#214AAB] dark:text-[#214AAB] mb-5" />
            <h3 className="text-2xl font-serif font-bold mb-3 text-[#162F6A] dark:text-white">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              To be the benchmark of excellence in institutional legal counsel, recognized across India for our adherence to justice, transparency, and high legal ethics.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
