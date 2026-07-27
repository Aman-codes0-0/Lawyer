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
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-navy mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our firm and legal processes.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${openIndex === i ? 'ring-1 ring-gold border-gold' : 'hover:border-gray-300'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none cursor-pointer"
                onClick={() => toggleOpen(i)}
              >
                <span className="font-bold text-navy text-lg">{faq.question}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-serif font-bold text-navy mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-8">If you couldn't find the answer to your question, feel free to contact us directly or schedule a consultation.</p>
          <Link 
            to="/contact"
            className="inline-block bg-navy hover:bg-[#152238] text-white px-8 py-3 rounded font-bold transition-all"
          >
            Contact Our Team
          </Link>
        </div>

      </div>
    </div>
  );
}
