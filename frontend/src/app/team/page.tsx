"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowRight, Mail } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import { lawyers } from "@/lib/lawyers-data";
import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const [filters, setFilters] = useState({ category: "", location: "", name: "" });
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
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
            {t("team_heading")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t("team_subtext")}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-[#0d1f3c] rounded-2xl p-6 mb-12 shadow-xl">
          <SearchBox
            compact
            initialCategory={filters.category}
            initialLocation={filters.location}
            initialName={filters.name}
            onSearch={(params) => setFilters(params)}
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {t("team_showing")} <span className="font-bold text-navy">{filtered.length}</span> {t("team_of")} {lawyers.length} {t("team_lawyers")}
        </p>

        {/* Team Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-2xl font-serif">{t("team_no_results")}</p>
            <button
              onClick={() => setFilters({ category: "", location: "", name: "" })}
              className="mt-6 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t("team_clear")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((lawyer, i) => (
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
                  <p className="text-gold font-bold text-sm mb-2 uppercase tracking-widest">{lawyer.specialization}</p>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-1">{lawyer.name}</h3>
                  <p className="text-gray-500 mb-1">{lawyer.role}</p>
                  <p className="text-sm text-gray-400 mb-1">{lawyer.location}</p>
                  <p className="text-sm text-gray-400 mb-6 italic">{lawyer.edu}</p>
                  <Link href={`/book-consultation`} className="inline-flex items-center justify-center w-full text-navy font-bold hover:text-gold transition-colors border-t border-gray-100 pt-6">
                    {t("team_book_with")} {lawyer.name.split(" ")[1] ?? lawyer.name.split(" ")[0]} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
