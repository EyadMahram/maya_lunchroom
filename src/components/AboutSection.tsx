import { motion } from "framer-motion";
import { QamariyaDivider, QamariyaBorder, QamariyaStar } from "@/components/YemeniMotifs";
import heroImg from "@/assets/hero.png";

const pillars = [
  { title: "Our Menu",       body: "A carefully curated selection of fresh sandwiches, salads, baked goods, and signature coffees — all prepared with high-quality, seasonal ingredients and a touch of Turkish inspiration." },
  { title: "Our Craft",      body: "Every item is made with care: from hand-pressed juices to freshly baked pastries and slow-brewed specialty coffees, prepared just the way you like them." },
  { title: "Our Hospitality", body: "At Maya, every guest feels at home. We're committed to warm, attentive service that turns every visit into a pleasant and memorable experience." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-6 bg-secondary/20 relative overflow-hidden">
      {/* Background star motifs */}
      <QamariyaStar size={160} className="absolute -top-10 -right-10 opacity-5 hidden lg:block" />
      <QamariyaStar size={120} className="absolute bottom-10 -left-8 opacity-5 hidden lg:block" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Who We Are</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider mb-6">About Us</h2>
          <QamariyaDivider />
        </motion.div>

        {/* Two-column layout: image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src={heroImg}
                alt="Maya Lunchroom — cozy café in Zaandam"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative gold border offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/20 pointer-events-none" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
              <h3 className="font-display text-3xl sm:text-4xl tracking-wider mb-6 leading-snug">
              A Cozy Corner in<br />
              <span className="gold-gradient-text">the Heart of Zaandam</span>
            </h3>
            <div className="space-y-5 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
              <p>
                Maya Lunchroom was born from a passion for simple, high-quality food and genuine hospitality. Whether you're starting your day with a wholesome breakfast, stopping by for a quick lunch, or taking a break with one of our signature coffees or teas — we strive to make every visit a pleasant and satisfying experience.
              </p>
              <p>
                Our menu features a variety of freshly prepared sandwiches, salads, baked goods, and traditional Turkish touches, all made with care and attention to detail. At Maya, we believe that good food and warm service go hand in hand.
              </p>
            </div>

            <div className="mt-8">
              <QamariyaBorder />
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: "Fresh",  label: "Made daily" },
                { value: "30+",   label: "Menu items" },
                { value: "100%",  label: "Quality produce" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl gold-gradient-text mb-1">{s.value}</p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-card p-8 hover-glow text-center flex flex-col items-center gap-4"
            >
              <QamariyaDivider className="w-full" />
              <h4 className="font-display text-xl tracking-wider gold-gradient-text">{pillar.title}</h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
