import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { lawyers } from "@/lib/lawyers-data";
import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialName = searchParams.get("name") || "";

  const [filters, setFilters] = useState({
    category: initialCategory,
    location: initialLocation,
    name: initialName,
  });
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    return lawyers.filter((l) => {
      const matchCat =
        !filters.category || filters.category === "All Categories" || l.specialization === filters.category;
      const matchLoc =
        !filters.location ||
        filters.location === "All Locations" ||
        l.city === filters.location ||
        l.location.includes(filters.location);
      const matchName =
        !filters.name.trim() || l.name.toLowerCase().includes(filters.name.trim().toLowerCase());
      return matchCat && matchLoc && matchName;
    });
  }, [filters]);

  return (
    <div className="min-h-[100dvh] pt-28 pb-24 bg-[#F1F1F4] dark:bg-[#0E1B38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[#214AAB] dark:text-[#214AAB] font-bold uppercase tracking-widest text-xs mb-3 bg-[#D2DFFF] dark:bg-[#102047] px-3.5 py-1.5 rounded-md border border-[#214AAB]/20">
            Legal Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#162F6A] dark:text-white mb-4">
            {t("team_heading")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("team_subtext")}
          </p>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-medium">
          {t("team_showing")} <span className="font-bold text-[#162F6A] dark:text-[#214AAB]">{filtered.length}</span> {t("team_of")} {lawyers.length} {t("team_lawyers")}
        </p>

        {/* Team Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white dark:bg-[#162F6A] rounded-2xl border border-[#EBEAEA] p-8 shadow-sm">
            <p className="text-2xl font-serif text-[#162F6A] dark:text-white">{t("team_no_results")}</p>
            <button
              onClick={() => setFilters({ category: "", location: "", name: "" })}
              className="mt-6 px-6 py-2.5 border border-[#214AAB] text-[#214AAB] dark:text-[#214AAB] rounded-lg hover:bg-[#214AAB] hover:text-white transition-colors cursor-pointer font-bold text-sm"
            >
              {t("team_clear")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((lawyer, i) => (
              <div key={i} className="group bg-white dark:bg-[#162F6A] rounded-2xl overflow-hidden shadow-md border border-[#EBEAEA] dark:border-white/10 hover:shadow-xl hover:border-[#214AAB] transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={lawyer.img}
                    alt={lawyer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162F6A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Social Links */}
                  <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a href="#" className="w-9 h-9 rounded-full bg-[#214AAB] text-[#162F6A] flex items-center justify-center hover:bg-white transition-colors font-bold text-xs shadow-md">
                      IN
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full bg-[#214AAB] text-[#162F6A] flex items-center justify-center hover:bg-white transition-colors shadow-md">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center relative">
                  <p className="text-[#162F6A] dark:text-[#214AAB] font-bold text-xs mb-2 uppercase tracking-widest bg-[#D2DFFF] dark:bg-[#102047] inline-block px-3 py-1 rounded-md border border-[#214AAB]/20">{lawyer.specialization}</p>
                  <h3 className="text-xl font-serif font-bold text-[#162F6A] dark:text-white mb-1">{lawyer.name}</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-xs mb-4">{lawyer.experience}+ Years Legal Experience • {lawyer.city}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to="/book-consultation"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#214AAB] hover:bg-[#1A3E94] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Book Consultation <ArrowRight className="w-3.5 h-3.5 text-[#A3BBF3]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
