import Image from "next/image";
import { Award, Target, Scale, History } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-[100dvh] pt-28 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            About Our Firm
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded on principles of integrity, excellence, and unwavering dedication to our clients.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[400px] sm:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?q=80&w=1000&auto=format&fit=crop"
              alt="Law Firm Office"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm mb-2">
              <History className="w-4 h-4" /> Our History
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
              Two Decades of Legal Excellence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since our establishment in 2004, LexPrime has been at the forefront of complex legal battles, securing landmark victories and setting precedents in both corporate and civil law.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our firm was founded with a singular vision: to provide premium, uncompromising legal representation that prioritizes client success above all else. Today, we are recognized as one of the most formidable legal teams in the region.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-navy p-8 sm:p-12 rounded-2xl text-white">
            <Target className="w-12 h-12 text-gold mb-6" />
            <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To deliver strategic, effective, and ethical legal solutions that protect our clients' interests and secure their futures. We strive to navigate the complexities of the law so our clients can navigate their lives with peace of mind.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-8 sm:p-12 rounded-2xl text-navy">
            <Scale className="w-12 h-12 text-gold mb-6" />
            <h3 className="text-3xl font-serif font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the premier law firm of choice for individuals and corporations facing their most critical legal challenges, known for our innovative strategies, relentless advocacy, and unparalleled record of success.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
