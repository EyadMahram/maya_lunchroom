import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QamariyaCorner, QamariyaBorder, QamariyaDivider, ArchMotif } from "@/components/YemeniMotifs";

const categories = ["Breakfast", "Sandwiches", "Salads", "Drinks"] as const;
type Category = (typeof categories)[number];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

const menuData: Record<Category, MenuItem[]> = {
  Breakfast: [
    { name: "Avocado Toast",       description: "Toasted sourdough, smashed avocado, cherry tomatoes, lemon zest, red pepper flakes", price: "9", tag: "Popular" },
    { name: "Egg & Cheese Croissant", description: "Buttery croissant, scrambled eggs, Gouda cheese, fresh chives",                  price: "8" },
    { name: "Yoghurt Bowl",        description: "Greek yoghurt, seasonal fruit, house-made granola, honey drizzle",                   price: "8" },
    { name: "Turkish Menemen",     description: "Scrambled eggs with tomato, green peppers and spices, served with fresh bread",      price: "10", tag: "Signature" },
  ],
  Sandwiches: [
    { name: "Club Sandwich",         description: "Toasted white bread, chicken, bacon, lettuce, tomato, house mayo",                price: "12", tag: "Classic" },
    { name: "Tuna Melt",             description: "Sourdough, house tuna salad, melted cheddar, capers, red onion",                  price: "11" },
    { name: "Turkish Chicken Wrap",  description: "Grilled chicken, hummus, fresh vegetables, sumac onions, warm flatbread",         price: "12", tag: "Chef's Pick" },
    { name: "Caprese Ciabatta",      description: "Fresh mozzarella, heirloom tomato, basil, olive oil, aged balsamic",             price: "11" },
  ],
  Salads: [
    { name: "Caesar Salad",   description: "Crisp romaine, Parmesan shavings, house croutons, anchovy Caesar dressing",             price: "12" },
    { name: "Quinoa Bowl",    description: "Roasted vegetables, chickpeas, feta, pomegranate seeds, lemon tahini dressing",          price: "13", tag: "Vegan Option" },
    { name: "Greek Salad",    description: "Cucumber, olives, feta, red onion, cherry tomatoes, dried oregano",                     price: "11" },
    { name: "Smoked Salmon",  description: "Mixed greens, smoked salmon, capers, dill cream dressing, lemon",                       price: "14", tag: "Seasonal" },
  ],
  Drinks: [
    { name: "Filter Coffee",     description: "Freshly ground Colombian blend, served light, medium or strong",                      price: "3" },
    { name: "Maya Latte",        description: "House espresso, steamed oat milk, hint of vanilla",                                   price: "4", tag: "Signature" },
    { name: "Fresh Mint Tea",    description: "Loose-leaf green tea, fresh garden mint, honey on the side",                          price: "3" },
    { name: "Fresh Orange Juice", description: "Hand-pressed seasonal oranges, served chilled",                                     price: "4" },
  ],
};

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.95,
  }),
};

const MenuSection = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (next: number) => {
    setDirection(next > pageIndex ? 1 : -1);
    setPageIndex(next);
  };

  const prev = () => pageIndex > 0 && goTo(pageIndex - 1);
  const next = () => pageIndex < categories.length - 1 && goTo(pageIndex + 1);

  const active = categories[pageIndex];
  const items = menuData[active];

  return (
    <section id="menu" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Fresh & Seasonal</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider mb-6">Our Menu</h2>
          <QamariyaDivider />
        </motion.div>

        {/* Book */}
        <div className="relative max-w-3xl mx-auto" style={{ perspective: "1200px" }}>
          {/* Book cover / spine shadow */}
          <div className="absolute -inset-3 sm:-inset-5 bg-secondary/60 rounded border border-border/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]" />

          {/* Book binding line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 hidden sm:block z-10" />

          {/* Page content */}
          <div className="relative min-h-[520px] sm:min-h-[480px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-card/80 backdrop-blur-sm border border-border/20 p-8 sm:p-12"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Qamariya corner ornaments */}
                <QamariyaCorner className="absolute top-3 left-3" />
                <QamariyaCorner className="absolute top-3 right-3" flip />
                <QamariyaCorner className="absolute bottom-3 left-3 rotate-90" />
                <QamariyaCorner className="absolute bottom-3 right-3 rotate-90" flip />

                {/* Arch motif behind chapter title */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-40">
                  <ArchMotif />
                </div>

                {/* Page header */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                      Chapter {pageIndex + 1}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl tracking-wider gold-gradient-text">
                      {active}
                    </h3>
                  </div>
                  <div className="font-display text-6xl text-border/30 select-none">
                    {String(pageIndex + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Yemeni geometric border divider */}
                <QamariyaBorder className="mb-8" />

                {/* Menu items */}
                <div className="space-y-6">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="group flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-display text-lg tracking-wide group-hover:text-primary transition-colors duration-300">
                            {item.name}
                          </h4>
                          {item.tag && (
                            <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full whitespace-nowrap">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-light">
                          {item.description}
                        </p>
                      </div>
                      {/* Dotted leader */}
                      <div className="hidden sm:flex flex-1 items-end pb-1 mx-2">
                        <div className="w-full border-b border-dotted border-border/40" />
                      </div>
                      <span className="font-display text-lg text-primary shrink-0">€{item.price}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom border + page number */}
                <QamariyaBorder className="mt-8 mb-4" />
                <div className="flex justify-center">
                  <span className="text-xs text-muted-foreground/50 tracking-[0.3em] font-display italic">
                    — {pageIndex + 1} of {categories.length} —
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            disabled={pageIndex === 0}
            className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            disabled={pageIndex === categories.length - 1}
            className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-3 mt-10">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => goTo(i)}
              className={`text-xs tracking-[0.15em] uppercase font-body px-3 py-2 transition-all duration-300 border-b-2 ${
                i === pageIndex
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
