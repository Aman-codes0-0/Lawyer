import Image from "next/image";
import Link from "next/link";
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
    <div className="min-h-[100dvh] pt-28 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy mb-6">
              Legal Insights & News
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert analysis, firm news, and practical legal guides written by our attorneys.
            </p>
          </div>
          <div className="w-full md:w-80 relative">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-4 py-3 rounded border border-gray-300 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Featured Post (First one) */}
        <div className="mb-16">
          <Link href="/blog" className="group flex flex-col lg:flex-row bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
              <Image src={posts[0].img} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold text-xs uppercase tracking-wider rounded-full mb-6 w-fit">
                {posts[0].category}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {posts[0].author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {posts[0].date}</span>
                </div>
                <div className="text-navy font-bold flex items-center group-hover:text-gold transition-colors">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, i) => (
            <Link href="/blog" key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-60 overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-navy font-bold text-xs uppercase tracking-wider rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                  <ArrowRight className="w-4 h-4 text-navy group-hover:text-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
