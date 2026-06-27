"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus } from "react-icons/lu";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqData: FAQItem[] = [
    {
      question: "How do I know if a lawyer is verified?",
      answer:
        "Every legal practitioner on our platform goes through a strict verification process. Admin audits their academic transcripts, bar association council certificates, and legal history before granting them the 'Approved' status and lifetime premium verification badge.",
    },
    {
      question: "How does the hourly consultation billing work?",
      answer:
        "Lawyers set their own hourly rates (e.g., $90/hr or $115/hr) displayed transparently on their profiles. When you submit a hiring request and it is accepted, secure payments are processed safely through our Integrated Stripe gateway wrapper.",
    },
    {
      question: "Can I manage multiple legal cases simultaneously?",
      answer:
        "Yes, absolutely! As a client, your unified dashboard allows you to submit hiring requests to multiple attorneys across various specializations like Family Law, Corporate Law, or Criminal Defense and track all of their status updates independently.",
    },
    {
      question:
        "What should I do if a lawyer changes their availability status?",
      answer:
        "Lawyers dynamically switch their profile state between 'Available' and 'Busy' depending on their current retainer caseload. If a lawyer is busy, you can still view their credentials or explore other highly qualified featured legal experts within the directory.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 overflow-hidden">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          QUESTIONS
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mt-0.5">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-default-400 max-w-md mx-auto font-medium">
          Got questions about our premier verification ledger, billing, or
          hiring frameworks? We have answers.
        </p>
      </div>

      <div className="w-full space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#0D1117]/5 dark:bg-[#0F141C] border border-default-200/50 dark:border-[#1E2530] rounded-2xl overflow-hidden transition-colors duration-200 hover:border-default-400/80 dark:hover:border-[#2E3748]"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-5 flex items-center justify-between gap-4 text-left outline-none cursor-pointer group select-none bg-transparent border-none"
              >
                <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`p-1.5 rounded-xl border shrink-0 transition-colors ${
                    isOpen
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
                      : "bg-default-100/50 border-default-200 text-default-500 group-hover:text-foreground"
                  }`}
                >
                  <LuPlus className="size-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.25, ease: "easeOut" },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.25, ease: "easeIn" },
                        opacity: { duration: 0.15 },
                      },
                    }}
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-default-500 dark:text-default-400 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
