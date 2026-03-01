import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero.png";
import { QamariyaDivider, QamariyaStar } from "@/components/YemeniMotifs";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Old City of Sana'a, Yemen — UNESCO World Heritage Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />
      </div>

      {/* Subtle qamariya stars in corners */}
      <QamariyaStar size={80} className="absolute top-24 left-8 opacity-30 hidden md:block" />
      <QamariyaStar size={60} className="absolute top-32 right-12 opacity-20 hidden md:block" />
      <QamariyaStar size={50} className="absolute bottom-32 left-16 opacity-15 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <QamariyaDivider className="mb-8" />
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider mb-6 gold-gradient-text">
            MAYA
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/90 tracking-[0.3em] uppercase mb-4">
            Lunchroom · Zaandam
          </p>
          <QamariyaDivider className="mt-8 mb-10" />
          <p className="font-body text-base text-white/75 max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to Maya Lunchroom, a cozy and inviting café located in the heart of Zaandam. We take pride in offering a carefully curated menu that blends fresh, high-quality ingredients with a passion for flavor and hospitality.
          </p>
        </motion.div>

        <motion.a
          href="#menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="inline-flex flex-col items-center mt-16 text-white/60 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-[0.3em] uppercase mb-2">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
