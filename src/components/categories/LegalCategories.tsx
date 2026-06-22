"use client";

import React from "react";
import { Card } from "@heroui/react";
import { useRouter } from "next/navigation"; // ১. useRouter ইম্পোর্ট করা হলো
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Shield, Suitcase, Heart, Globe, House } from "@gravity-ui/icons";
import { FiZap, FiUsers, FiFileText } from "react-icons/fi";

interface CategoryItem {
  id: string;
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  darkBg: string;
  darkBorder: string;
  iconBg: string;
  iconColor: string;
  value: string; // ২. ব্যাকএন্ডের ডাইনামিক স্পেসালাইজেশন ভ্যালুর সাথে ম্যাচ করার জন্য প্রোপার্টি
}

const categories: CategoryItem[] = [
  {
    id: "criminal",
    title: "Criminal Defense",
    count: 48,
    icon: Shield,
    darkBg: "dark:bg-[#1C0D12] dark:border-[#381621]",
    darkBorder: "dark:hover:border-[#542132]",
    iconBg: "dark:bg-[#2A151C]",
    iconColor: "text-[#DCA5B9]",
    value: "Criminal Defense Law",
  },
  {
    id: "corporate",
    title: "Corporate Law",
    count: 62,
    icon: Suitcase,
    darkBg: "dark:bg-[#0D162B] dark:border-[#16274D]",
    darkBorder: "dark:hover:border-[#213B75]",
    iconBg: "dark:bg-[#182747]",
    iconColor: "text-[#8EAEF8]",
    value: "Corporate Law",
  },
  {
    id: "family",
    title: "Family Law",
    count: 39,
    icon: Heart,
    darkBg: "dark:bg-[#1A0C1A] dark:border-[#361536]",
    darkBorder: "dark:hover:border-[#522052]",
    iconBg: "dark:bg-[#2B142B]",
    iconColor: "text-[#E69FE6]",
    value: "Family Law",
  },
  {
    id: "immigration",
    title: "Immigration",
    count: 33,
    icon: Globe,
    darkBg: "dark:bg-[#061C14] dark:border-[#0E3A29]",
    darkBorder: "dark:hover:border-[#16573D]",
    iconBg: "dark:bg-[#0F3225]",
    iconColor: "text-[#76DCA7]",
    value: "Immigration Law",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    count: 27,
    icon: House,
    darkBg: "dark:bg-[#1F1C0D] dark:border-[#3D3719]",
    darkBorder: "dark:hover:border-[#5C5326]",
    iconBg: "dark:bg-[#2E2916]",
    iconColor: "text-[#DFD087]",
    value: "Real Estate Law",
  },
  {
    id: "property",
    title: "Intellectual Property",
    count: 21,
    icon: FiZap,
    darkBg: "dark:bg-[#130E26] dark:border-[#281D4F]",
    darkBorder: "dark:hover:border-[#3C2C77]",
    iconBg: "dark:bg-[#211842]",
    iconColor: "text-[#AB99E9]",
    value: "Intellectual Property Law",
  },
  {
    id: "employment",
    title: "Employment Law",
    count: 44,
    icon: FiUsers,
    darkBg: "dark:bg-[#08181E] dark:border-[#11313E]",
    darkBorder: "dark:hover:border-[#1B4B5E]",
    iconBg: "dark:bg-[#112A35]",
    iconColor: "text-[#7AC5E2]",
    value: "Employment Law",
  },
  {
    id: "tax",
    title: "Tax Law",
    count: 18,
    icon: FiFileText,
    darkBg: "dark:bg-[#1F130D] dark:border-[#3E2519]",
    darkBorder: "dark:hover:border-[#5E3826]",
    iconBg: "dark:bg-[#2E1E16]",
    iconColor: "text-[#E2A784]",
    value: "Tax Law",
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
  visible: (customIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: customIndex * 0.12,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

export default function LegalCategories() {
  const router = useRouter(); 

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/browse-lawyer?category=${encodeURIComponent(categoryValue)}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-background text-foreground transition-colors duration-200">
      {/* Header section */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider text-primary uppercase block mb-1">
          Practice Areas
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Legal Categories</h2>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                layout
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
                onClick={() => handleCategoryClick(category.value)} 
              >
                <Card
                  className={`
                    p-6 border bg-content1 cursor-pointer rounded-2xl select-none w-full h-full
                    border-default-200 hover:border-default-400 hover:shadow-lg hover:shadow-default-100
                    transition-colors duration-200
                    ${category.darkBg} ${category.darkBorder} dark:hover:shadow-none
                  `}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-default-100 mb-5 transition-colors duration-200 ${category.iconBg} ${category.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <Card.Header className="p-0 flex flex-col items-start gap-1">
                    <Card.Title className="text-base font-semibold tracking-wide text-foreground">
                      {category.title}
                    </Card.Title>
                    <Card.Description className="text-sm font-medium text-default-400 dark:text-gray-500">
                      {category.count} lawyers
                    </Card.Description>
                  </Card.Header>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
