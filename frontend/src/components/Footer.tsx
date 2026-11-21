import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-[#162F6A] text-gray-200 border-t border-[#DDA73A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <div className="w-10 h-10 rounded-lg bg-[#DDA73A]/15 border border-[#DDA73A]/40 flex items-center justify-center group-hover:bg-[#DDA73A]/25 transition-colors">
                <Scale className="h-6 w-6 text-[#DDA73A]" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                Lex<span className="text-[#DDA73A]">Prime</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              {t("footer_tagline")}
            </p>
            {settings.showFooterSocials && (
              <div className="flex space-x-3">
                {[
                  {
                    name: "Twitter / X",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    href: "#",
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#DDA73A] hover:border-[#DDA73A] hover:text-[#162F6A] transition-all cursor-pointer shadow-sm"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6 border-b-2 border-[#DDA73A] pb-1 inline-block">{t("footer_quick_links")}</h3>
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
                    className="flex items-center gap-2 text-gray-300 hover:text-[#DDA73A] transition-colors group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-[#DDA73A] group-hover:translate-x-1 transition-transform" />
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Expertise */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6 border-b-2 border-[#DDA73A] pb-1 inline-block">{t("footer_expertise")}</h3>
            <ul className="space-y-3">
              {[
                "Corporate Law",
                "Criminal Law",
                "Family Law",
                "Civil Litigation",
                "Cyber & Tech Law",
              ].map((area) => (
                <li key={area}>
                  <Link
                    to="/team"
                    className="flex items-center gap-2 text-gray-300 hover:text-[#DDA73A] transition-colors group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-[#DDA73A] group-hover:translate-x-1 transition-transform" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6 border-b-2 border-[#DDA73A] pb-1 inline-block">{t("footer_contact")}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DDA73A] shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Legal Avenue, Shastri Bhawan Annex<br />New Delhi, ND 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#DDA73A] shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-[#DDA73A] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#DDA73A] shrink-0" />
                <a href="mailto:contact@lexprime.com" className="text-gray-300 hover:text-[#DDA73A] transition-colors">
                  contact@lexprime.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#102047]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300">
          <p>
            © {new Date().getFullYear()} {t("footer_copyright")}
          </p>
          <div className="flex space-x-6">
            <Link to="/faq" className="hover:text-white transition-colors">{t("footer_privacy")}</Link>
            <Link to="/faq" className="hover:text-white transition-colors">{t("footer_terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
