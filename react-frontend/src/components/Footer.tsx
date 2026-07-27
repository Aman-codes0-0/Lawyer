import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#07172f] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <Scale className="h-8 w-8 text-gold" />
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                Lex<span className="text-gold">Prime</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {t("footer_tagline")}
            </p>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 sm:w-4 sm:h-4 bg-current rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">{t("footer_quick_links")}</h3>
            <ul className="space-y-3">
              {[
                { nameKey: "nav_about" as const, href: "/about" },
                { nameKey: "nav_team" as const, href: "/team" },
                { nameKey: "nav_blog" as const, href: "/blog" },
                { nameKey: "nav_contact" as const, href: "/contact" },
              ].map((link) => (
                <li key={link.nameKey}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 hover:text-gold transition-colors group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors" />
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Expertise */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">{t("footer_expertise")}</h3>
            <ul className="space-y-3">
              {[
                "Criminal Law",
                "Family Law",
                "Property Law",
                "Corporate Law",
                "Civil Litigation",
              ].map((area) => (
                <li key={area}>
                  <Link
                    to="/team"
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
            <h3 className="text-white font-serif font-bold text-lg mb-6">{t("footer_contact")}</h3>
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
            © {new Date().getFullYear()} {t("footer_copyright")}
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/faq" className="hover:text-white transition-colors">{t("footer_privacy")}</Link>
            <Link to="/faq" className="hover:text-white transition-colors">{t("footer_terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
