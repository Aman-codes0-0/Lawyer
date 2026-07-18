import Link from "next/link";
import { Scale, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07172f] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <Scale className="h-8 w-8 text-gold" />
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                Lex<span className="text-gold">Prime</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              A premium law firm dedicated to providing exceptional legal services with integrity, professionalism, and respect for our clients.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Team", href: "/team" },
                { name: "Practice Areas", href: "/practice-areas" },
                { name: "Blog & News", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-gold transition-colors group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Practice Areas</h3>
            <ul className="space-y-3">
              {[
                "Corporate Law",
                "Family Law",
                "Criminal Defense",
                "Property Disputes",
                "Intellectual Property",
              ].map((area) => (
                <li key={area}>
                  <Link
                    href="/practice-areas"
                    className="flex items-center gap-2 hover:text-gold transition-colors group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>123 Legal Avenue, Suite 400<br />New Delhi, ND 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:contact@lexprime.com" className="hover:text-white transition-colors">
                  contact@lexprime.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#051021]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LexPrime Law Firm. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
