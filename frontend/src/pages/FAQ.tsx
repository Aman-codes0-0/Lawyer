import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What should I expect during my first consultation?",
    answer: "During your initial consultation, an attorney will listen to the details of your situation, review any relevant documents, explain your legal options, and outline a potential strategy. This meeting is completely confidential."
  },
  {
    question: "How does your firm charge for legal services?",
    answer: "Our fee structure varies depending on the type of case. We offer hourly rates, flat fees for specific services, and contingency fee arrangements (where we only get paid if you win) for certain types of litigation. We discuss all fees transparently upfront."
  },
  {
    question: "How long will my case take to resolve?",
    answer: "The timeline of a legal matter depends entirely on its complexity, the court's schedule, and the willingness of the opposing party to negotiate. During your consultation, we can provide a general estimate based on similar cases."
  },
  {
    question: "Will my case go to trial?",
    answer: "Not necessarily. Many civil cases and family law disputes are resolved through negotiation, mediation, or settlement out of court. However, if a fair settlement cannot be reached, our experienced trial lawyers are fully prepared to litigate in court."
  },
  {
    question: "What documents should I bring to my consultation?",
    answer: "Bring any documents relevant to your case. This may include contracts, court notices, correspondence, photographs, financial records, or police reports. We will provide a specific list of recommended documents when you schedule your appointment."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#F1F1F4] dark:bg-[#0E1B38] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#214AAB] dark:text-[#DDA73A] font-bold uppercase tracking-widest text-xs mb-3 bg-[#D2DFFF] dark:bg-[#102047] px-3.5 py-1.5 rounded-md border border-[#214AAB]/20">
            Citizen & Client Legal Guidance
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#162F6A] dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Clarifications on legal procedure, consultation formalities, and representation terms.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5 mb-16">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border rounded-xl overflow-hidden transition-all duration-200 bg-white dark:bg-[#162F6A] shadow-sm ${
                openIndex === i ? 'border-[#214AAB] ring-1 ring-[#214AAB] dark:border-[#DDA73A]' : 'border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB]/50'
              }`}
            >
              <button
                className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none cursor-pointer transition-colors"
                onClick={() => toggleOpen(i)}
              >
                <span className="font-bold text-[#162F6A] dark:text-white text-base sm:text-lg">{faq.question}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-[#214AAB] dark:text-[#DDA73A] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out bg-[#F8F9FA] dark:bg-[#102047] ${
                  openIndex === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-3 border-t border-[#EBEAEA] dark:border-white/10 text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-8 sm:p-10 text-center border border-[#EBEAEA] dark:border-white/10 shadow-lg">
          <h3 className="text-2xl font-serif font-bold text-[#162F6A] dark:text-white mb-2">Have specific statutory queries?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 max-w-xl mx-auto">
            Our legal secretariat is available to assist you with formal consultation scheduling and documentation inquiries.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#DDA73A]/40 px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            Submit Formal Inquiry
          </Link>
        </div>

      </div>
    </div>
  );
}
