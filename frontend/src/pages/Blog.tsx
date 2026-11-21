import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, User } from "lucide-react";

const posts = [
  { 
    title: "How to File a Divorce: A Complete Guide", 
    category: "Family Law",
    date: "October 12, 2023",
    author: "Elena Rodriguez",
    excerpt: "Navigating a divorce can be emotionally and legally challenging. This comprehensive guide outlines the steps required to file for divorce and what you should expect during the process.",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "Property Dispute Resolution Strategies for 2024", 
    category: "Property Law",
    date: "September 28, 2023",
    author: "Sarah Jenkins",
    excerpt: "Property disputes often escalate quickly. Learn about the most effective mediation and litigation strategies to resolve boundary issues, title disputes, and landlord-tenant conflicts.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "Understanding Your Rights in Corporate Mergers", 
    category: "Corporate Law",
    date: "September 15, 2023",
    author: "Robert Harrison",
    excerpt: "When two companies merge, shareholder and employee rights are often in flux. Discover how to protect your interests during corporate restructuring.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "The Impact of New Tax Regulations on Small Businesses", 
    category: "Tax Law",
    date: "August 30, 2023",
    author: "David Sterling",
    excerpt: "Recent legislative changes have introduced new compliance requirements for small and medium enterprises. Here is what you need to know to avoid penalties.",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop"
  },
];

export default function Blog() {
  return (
    <div className="min-h-[100dvh] pt-28 pb-24 bg-[#F1F1F4] dark:bg-[#0E1B38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#214AAB] dark:text-[#214AAB] font-bold uppercase tracking-widest text-xs mb-3 bg-[#D2DFFF] dark:bg-[#102047] px-3.5 py-1.5 rounded-md border border-[#214AAB]/20">
              Legal Bulletins & Advisories
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#162F6A] dark:text-white mb-4">
              Legal Insights & News
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Statutory analysis, landmark court orders, and practice advisories authored by our senior advocates.
            </p>
          </div>
          <div className="w-full md:w-80 relative">
            <input 
              type="text" 
              placeholder="Search legal articles..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none text-sm shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
          </div>
        </div>

        {/* Featured Post (First one) */}
        <div className="mb-12">
          <Link to="/blog" className="group flex flex-col lg:flex-row bg-white dark:bg-[#162F6A] rounded-2xl overflow-hidden border border-[#EBEAEA] dark:border-white/10 hover:shadow-xl hover:border-[#214AAB] transition-all duration-300 shadow-md">
            <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
              <img src={posts[0].img} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-[#D2DFFF] dark:bg-[#102047] text-[#162F6A] dark:text-[#214AAB] font-bold text-xs uppercase tracking-wider rounded-md mb-4 w-fit border border-[#214AAB]/20">
                {posts[0].category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#162F6A] dark:text-white mb-3 group-hover:text-[#214AAB] dark:group-hover:text-[#214AAB] transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#214AAB]" /> {posts[0].author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#214AAB]" /> {posts[0].date}</span>
                </div>
                <div className="text-[#214AAB] dark:text-[#214AAB] font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Read More <ArrowRight className="ml-1.5 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, i) => (
            <Link to="/blog" key={i} className="group bg-white dark:bg-[#162F6A] rounded-2xl overflow-hidden shadow-md border border-[#EBEAEA] dark:border-white/10 hover:shadow-xl hover:border-[#214AAB] transition-all duration-300 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#162F6A]/90 text-[#214AAB] font-bold text-[11px] uppercase tracking-wider rounded-md border border-[#214AAB]/30 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-[#162F6A] dark:text-white mb-3 group-hover:text-[#214AAB] dark:group-hover:text-[#214AAB] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-white/10">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#214AAB]" /> {post.date}</span>
                  <ArrowRight className="w-4 h-4 text-[#214AAB] dark:text-[#214AAB] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
