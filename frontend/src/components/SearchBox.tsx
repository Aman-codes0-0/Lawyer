import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate(`/team?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#162F6A] dark:text-[#214AAB]" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white focus:border-[#214AAB] focus:outline-none text-sm appearance-none shadow-sm"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-white dark:bg-[#162F6A] text-[#23232A] dark:text-white">{loc}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#162F6A] dark:text-[#214AAB]" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white focus:border-[#214AAB] focus:outline-none text-sm appearance-none shadow-sm"
          >
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec} className="bg-white dark:bg-[#162F6A] text-[#23232A] dark:text-white">{spec}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#162F6A] dark:text-[#214AAB]" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("search_placeholder_name")}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:outline-none text-sm shadow-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-[#214AAB] hover:bg-[#1A3E94] text-white font-bold px-6 py-2.5 rounded-lg border border-[#214AAB]/40 transition-all text-sm whitespace-nowrap cursor-pointer shadow-md"
        >
          <Search className="w-4 h-4" />
          {t("search_button")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#214AAB]/30 rounded-2xl p-3 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Location */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <MapPin className="w-5 h-5 text-[#162F6A] dark:text-[#214AAB]" />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB] focus:border-[#214AAB] text-[#23232A] dark:text-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer font-medium text-sm"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-white dark:bg-[#162F6A] text-[#23232A] dark:text-white">{loc}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <label className="absolute -top-2.5 left-3 bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#214AAB]/30 px-2 text-[11px] text-[#162F6A] dark:text-[#214AAB] font-bold rounded">
              {t("search_location")}
            </label>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex items-center">
            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Category */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <Scale className="w-5 h-5 text-[#162F6A] dark:text-[#214AAB]" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB] focus:border-[#214AAB] text-[#23232A] dark:text-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer font-medium text-sm"
            >
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec} className="bg-white dark:bg-[#162F6A] text-[#23232A] dark:text-white">{spec}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <label className="absolute -top-2.5 left-3 bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#214AAB]/30 px-2 text-[11px] text-[#162F6A] dark:text-[#214AAB] font-bold rounded">
              {t("search_category")}
            </label>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex items-center">
            <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Name */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <User className="w-5 h-5 text-[#162F6A] dark:text-[#214AAB]" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search_placeholder_name")}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB] focus:border-[#214AAB] text-[#23232A] dark:text-white placeholder-gray-400 focus:outline-none transition-all duration-200 font-medium text-sm"
            />
            <label className="absolute -top-2.5 left-3 bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#214AAB]/30 px-2 text-[11px] text-[#162F6A] dark:text-[#214AAB] font-bold rounded">
              {t("search_name")}
            </label>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#214AAB]/40 font-bold px-8 py-3.5 rounded-xl transition-all shadow-md group whitespace-nowrap w-full lg:w-auto min-w-[150px] cursor-pointer"
          >
            <Search className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {t("search_button")}
          </button>
        </div>
      </div>
    </div>
  );
}
