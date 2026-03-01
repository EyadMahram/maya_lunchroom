import { motion } from "framer-motion";
import { useState } from "react";
import pancakes from "@/assets/pancakes.png";
import interior from "@/assets/interior.png";
import desserts from "@/assets/desserts.png";
import exterior from "@/assets/exterior.png";
import crepes from "@/assets/crepes.png";
import ambiance from "@/assets/ambiance.png";

const images = [
  { src: pancakes, alt: "Stacked pancakes with strawberries and chocolate drizzle", caption: "Pancakes" },
  { src: interior, alt: "Cozy interior of Maya Lunchroom with window view of Zaandam", caption: "Cozy Interior" },
  { src: desserts, alt: "Rainbow layered cake and chocolate dessert on outdoor terrace", caption: "Terrace Treats" },
  { src: exterior, alt: "Maya Lunchroom exterior — iconic green Zaandam building", caption: "Our Café" },
  { src: crepes, alt: "Fresh crepes with Nutella and strawberries", caption: "Crepes" },
  { src: ambiance, alt: "Lush green interior ceiling with hanging flowers", caption: "Ambiance" },
];

const GallerySection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">A Visual Journey</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider mb-6">The Flavours of Maya</h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative aspect-square overflow-hidden group cursor-pointer hover-glow"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors duration-500 flex items-end p-6">
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredIdx === i ? 1 : 0, y: hoveredIdx === i ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-display text-xl tracking-wider">{img.caption}</p>
                  <div className="h-px w-10 bg-primary mt-2" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
