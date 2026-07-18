import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

const team = [
  { 
    name: "Robert Harrison", 
    role: "Senior Partner", 
    spec: "Corporate Law", 
    edu: "Harvard Law School, J.D.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Elena Rodriguez", 
    role: "Managing Partner", 
    spec: "Family Law", 
    edu: "Yale Law School, J.D.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Michael Chen", 
    role: "Senior Associate", 
    spec: "Criminal Defense", 
    edu: "Stanford Law School, J.D.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Sarah Jenkins", 
    role: "Partner", 
    spec: "Property Law", 
    edu: "Columbia Law School, J.D.",
    img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "David Sterling", 
    role: "Associate", 
    spec: "Tax Law", 
    edu: "NYU School of Law, LL.M.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    name: "Anita Desai", 
    role: "Associate", 
    spec: "Civil Litigation", 
    edu: "Georgetown Law, J.D.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" 
  },
];

export default function Team() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            Our Legal Experts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A diverse team of seasoned professionals dedicated to achieving extraordinary results.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((lawyer, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-96 overflow-hidden bg-gray-200">
                <Image 
                  src={lawyer.img} 
                  alt={lawyer.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Social Links */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a href="#" className="w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center hover:bg-white transition-colors font-bold">
                    IN
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center hover:bg-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="p-8 text-center relative">
                <p className="text-gold font-bold text-sm mb-2 uppercase tracking-widest">{lawyer.spec}</p>
                <h3 className="text-2xl font-serif font-bold text-navy mb-1">{lawyer.name}</h3>
                <p className="text-gray-500 mb-4">{lawyer.role}</p>
                <p className="text-sm text-gray-400 mb-6 italic">{lawyer.edu}</p>
                <Link href={`/book-consultation`} className="inline-flex items-center justify-center w-full text-navy font-bold hover:text-gold transition-colors border-t border-gray-100 pt-6">
                  Book with {lawyer.name.split(' ')[0]} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
