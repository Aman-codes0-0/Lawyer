import Link from "next/link";
import { ArrowRight, Scale, Shield, Users, Briefcase, FileText, Home as HomeIcon } from "lucide-react";

const areas = [
  { 
    title: "Criminal Defense", 
    icon: Shield,
    desc: "Rigorous defense against criminal charges, protecting your rights and freedom with strategic advocacy.",
    features: ["DUI/DWI", "White Collar Crimes", "Drug Offenses", "Appeals"]
  },
  { 
    title: "Civil Litigation", 
    icon: Scale,
    desc: "Resolving complex disputes through negotiation, mediation, and aggressive courtroom representation.",
    features: ["Breach of Contract", "Torts", "Class Actions", "Injunctions"]
  },
  { 
    title: "Family Law", 
    icon: Users,
    desc: "Compassionate legal support for divorce, child custody, alimony, and other sensitive family matters.",
    features: ["Divorce", "Child Custody", "Prenuptial Agreements", "Adoption"]
  },
  { 
    title: "Property Law", 
    icon: HomeIcon,
    desc: "Navigating real estate transactions, boundary disputes, and commercial property negotiations.",
    features: ["Real Estate Closings", "Landlord/Tenant", "Zoning", "Title Disputes"]
  },
  { 
    title: "Corporate Law", 
    icon: Briefcase,
    desc: "Comprehensive legal counsel for businesses, from formation and mergers to compliance and litigation.",
    features: ["M&A", "Corporate Governance", "Intellectual Property", "Contracts"]
  },
  { 
    title: "Tax Law", 
    icon: FileText,
    desc: "Strategic tax planning and fierce representation in disputes with federal and state tax authorities.",
    features: ["Tax Audits", "Estate Planning", "International Tax", "Corporate Tax"]
  },
];

export default function PracticeAreas() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            Areas of Expertise
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our firm offers specialized legal services across a broad spectrum of practice areas, providing sophisticated solutions for complex challenges.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {areas.map((area, i) => (
            <div key={i} className="group bg-white rounded-2xl p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:border-gold">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                  <area.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{area.desc}</p>
                  
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {area.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book-consultation`} className="inline-flex items-center text-navy font-bold hover:text-gold transition-colors">
                    Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 bg-navy rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Not sure which area covers your case?</h2>
            <p className="text-lg text-gray-300 mb-8">Schedule an initial consultation and our team will evaluate your situation to provide the best legal strategy.</p>
            <Link 
              href="/book-consultation"
              className="inline-block bg-gold hover:bg-gold-light text-navy px-8 py-4 rounded font-bold transition-all shadow-lg"
            >
              Get a Case Evaluation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
