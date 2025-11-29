import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is home staging?",
      answer: "Home staging involves preparing a private residence for sale in the real estate market. The goal is to make a home appealing to the highest number of potential buyers, thereby selling a property more swiftly and for more money."
    },
    {
      question: "Is home staging expensive?",
      answer: "Not at all — it can be tailored to your budget. In fact, staging often costs far less than the first price reduction most sellers make if the home sits on the market too long."
    },
    {
      question: "How long does staging take?",
      answer: "Usually between 1–3 days, depending on the size of the home and the scope of work. I work efficiently to get your home ready for market as soon as possible."
    },
    {
      question: "Do you provide furniture and decor?",
      answer: "No. I don’t provide rental furniture. I work with my own decor pieces and accessories to enhance your space and create a clean, inviting look."
    },
    {
      question: "Does staging really help sell faster?",
      answer: "Yes! Statistics consistently show that staged homes sell faster and often for a higher price than non-staged homes. It helps buyers visualize the potential of the space."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#ede9e2]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-stone-200/50 shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-stone-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-serif font-medium text-stone-800 text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-olive-gray flex-shrink-0" />
                ) : (
                  <Plus className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-45 text-olive-gray' : ''}`} />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-[999px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 text-stone-600 leading-relaxed border-t border-stone-200">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
