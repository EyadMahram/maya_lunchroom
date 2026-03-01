import { motion } from "framer-motion";
import { useState } from "react";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";

const images = [
  { src: dish1, alt: "Avocado toast on toasted sourdough with fresh toppings", caption: "Avocado Toast" },
  { src: dish2, alt: "Club sandwich with chicken, bacon and fresh greens", caption: "Club Sandwich" },
  { src: dish3, alt: "Freshly brewed specialty coffee with oat milk", caption: "Maya Latte" },
  { src: dish4, alt: "Greek yoghurt bowl with seasonal fruit and granola", caption: "Yoghurt Bowl" },
  { src: dish5, alt: "Turkish menemen — eggs with tomato and peppers", caption: "Menemen" },
  { src: dish6, alt: "Fresh quinoa bowl with roasted vegetables and feta", caption: "Quinoa Bowl" },
];

const GallerySection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
