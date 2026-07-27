"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Scale, User } from "lucide-react";
import { SPECIALIZATIONS, LOCATIONS } from "@/lib/lawyers-data";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBoxProps {
  compact?: boolean;
  initialCategory?: string;
  initialLocation?: string;
  initialName?: string;
  onSearch?: (params: { category: string; location: string; name: string }) => void;
}

export default function SearchBox({
  compact = false,
  initialCategory = "",
  initialLocation = "",
  initialName = "",
  onSearch,
}: SearchBoxProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [category, setCategory] = useState(initialCategory || "All Categories");
  const [location, setLocation] = useState(initialLocation || "All Locations");
  const [name, setName] = useState(initialName || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category && category !== "All Categories") params.set("category", category);
    if (location && location !== "All Locations") params.set("location", location);
    if (name.trim()) params.set("name", name.trim());

    if (onSearch) {
      onSearch({ category, location, name });
    } else {
      router.push(`/team?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-gold focus:outline-none text-sm backdrop-blur-sm appearance-none"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-navy text-white">{loc}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-gold focus:outline-none text-sm backdrop-blur-sm appearance-none"
          >
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec} className="bg-navy text-white">{spec}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          placeholder={t("search_placeholder_name")}
            className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-gold focus:outline-none text-sm backdrop-blur-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-gold hover:bg-amber-400 text-navy font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-gold/30 text-sm whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          {t("search_button")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Location */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-transparent hover:border-white/20 focus:border-gold focus:bg-white/10 text-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer font-medium"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-[#0d1f3c] text-white">{loc}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <label className="absolute -top-2.5 left-3 bg-navy/80 px-2 text-xs text-gold font-semibold rounded">
              {t("search_location")}
            </label>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex items-center">
            <div className="w-px h-10 bg-white/20" />
          </div>

          {/* Category */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-transparent hover:border-white/20 focus:border-gold focus:bg-white/10 text-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer font-medium"
            >
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec} className="bg-[#0d1f3c] text-white">{spec}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <label className="absolute -top-2.5 left-3 bg-navy/80 px-2 text-xs text-gold font-semibold rounded">
              {t("search_category")}
            </label>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex items-center">
            <div className="w-px h-10 bg-white/20" />
          </div>

          {/* Name */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <User className="w-5 h-5 text-gold" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search_placeholder_name")}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-transparent hover:border-white/20 focus:border-gold focus:bg-white/10 text-white placeholder-white/40 focus:outline-none transition-all duration-200 font-medium"
            />
            <label className="absolute -top-2.5 left-3 bg-navy/80 px-2 text-xs text-gold font-semibold rounded">
              {t("search_name")}
            </label>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-gold hover:bg-amber-400 text-navy font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-gold/30 group whitespace-nowrap w-full lg:w-auto min-w-[160px]"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t("search_button")}
          </button>
        </div>
      </div>
    </div>
  );
}
