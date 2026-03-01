import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QamariyaCorner, QamariyaBorder, QamariyaDivider, ArchMotif } from "@/components/YemeniMotifs";

const categories = ["Breakfast", "Open Toasts", "Starters", "Pancakes", "Waffles", "Crêpes"] as const;
type Category = (typeof categories)[number];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

const menuData: Record<Category, MenuItem[]> = {
  Breakfast: [
    { name: "English Breakfast",          description: "Crispy bacon, grilled sausages, baked beans, tomatoes, mushrooms, eggs, warm toast",                                                                                   price: "17,95", tag: "Popular" },
    { name: "Çılbır Chef Special",        description: "Poached eggs on garlic yogurt base, butter-chili drizzle",                                                                                                             price: "15,95", tag: "Signature" },
    { name: "Fried Eggs",                 description: "Eggs cooked to a golden edge (3 eggs)",                                                                                                                               price: "8,95" },
    { name: "Turkish Sucuk Eggs",         description: "Eggs and spiced sucuk",                                                                                                                                               price: "11,95" },
    { name: "Turkish Menemen",            description: "Warm eggs with sautéed tomatoes and peppers",                                                                                                                         price: "10,95" },
    { name: "Turkish Sautéed Beef & Eggs", description: "Fresh eggs with pan-fried beef",                                                                                                                                    price: "14,50" },
    { name: "Omelette",                   description: "Choice of ingredients, 3 eggs",                                                                                                                                       price: "9,50" },
    { name: "Croissant Breakfast Melt",   description: "Golden croissant with omelette, beef salami, ricotta",                                                                                                               price: "13,95" },
    { name: "Smoothie Bowl",              description: "Yogurt, strawberry, banana, blueberry, honey, coconut, granola",                                                                                                     price: "8,95" },
    { name: "Mexican Bowl",               description: "Mexican rice, grilled chicken, tomatoes, red onion, black beans, sweet corn, avocado",                                                                               price: "14,95" },
    { name: "Turkish Bagel Egg",          description: "Eggs, spinach, cherry tomatoes, mozzarella, red onion, sun-dried tomatoes, parsley on a bagel",                                                                     price: "13,95" },
    { name: "Mini Breakfast",             description: "Croissant, multigrain bread, cream cheese, butter, strawberry jam, boiled egg, cucumber, cherry tomatoes, olives, mini green salad",                                 price: "14,95" },
    { name: "Turkish Breakfast Platter For 2", description: "Rulo böreği, turkish bagel, fried dough, three-cheese plate, apricot & walnut, tahini & molasses, clotted cream & honey, fried eggs, butter, two kinds of olives, salad, fried sausage, tea", price: "32,95", tag: "For 2" },
  ],
  "Open Toasts": [
    { name: "Avocado Fried Egg",   description: "Cream cheese, avocado smash, mixed salad, fried eggs, cherry tomatoes, black pepper, paprika",                                       price: "11,95" },
    { name: "Avocado Salmon",      description: "Cream cheese, avocado smash, mixed salad, salmon, cherry tomatoes, mustard sauce, sesame seeds, black cumin",                         price: "14,50", tag: "Popular" },
    { name: "Chicken Pesto",       description: "Cacık, pesto, mixed salad, cherry tomatoes, grilled chicken, sesame seeds, black cumin",                                              price: "13,95" },
    { name: "Mediterranean Bread", description: "Avocado smash, sliced tomatoes, soft mozzarella, poached egg",                                                                        price: "13,95" },
    { name: "Avocado Hummus",      description: "Sliced avocado, hummus, mixed salad, black olives, tomato, cucumber, balsamic dressing, sesame seeds, black cumin",                  price: "11,95" },
  ],
  Starters: [
    { name: "Soup of the Day",      description: "Ask your server for today's selection",                                                                                               price: "7,95" },
    { name: "Sharing Dip Platter",  description: "Hummus, guacamole, fresh salsa, trio of chips",                                                                                      price: "7,95" },
    { name: "Sigara Böreği",        description: "Chili sauce, yogurt dip, spicy paste, sesame & black cumin, arugula",                                                               price: "8,95" },
    { name: "Beef Carpaccio",       description: "Raw beef, extra virgin olive oil, lemon juice, shaved parmesan, rocket salad",                                                       price: "14,95" },
    { name: "Bitterballen",         description: "6 pcs beef bitterballen with mustard sauce",                                                                                         price: "9,95" },
    { name: "Cheesy Nachos",        description: "Tortilla chips, melted cheese, fresh salsa",                                                                                         price: "9,95" },
    { name: "Cheese Sticks",        description: "Golden fried cheese sticks, dipping sauce",                                                                                          price: "9,95" },
  ],
  Pancakes: [
    { name: "Strawberry Dream",  description: "Fresh strawberries, maple syrup, whipped cream, powdered sugar",                    price: "9,95", tag: "Favourite" },
    { name: "Choco Banana",      description: "Chocolate sauce, banana slices, almond bits, powdered sugar",                       price: "10,95" },
    { name: "Honey Granola",     description: "Crunchy granola, natural honey, fresh blueberries, powdered sugar",                 price: "9,95" },
    { name: "Biscoff Crush",     description: "Lotus Biscoff spread, Biscoff cookie pieces, caramel sauce, powdered sugar",       price: "10,95" },
  ],
  Waffles: [
    { name: "Strawberry Supreme",     description: "Fresh strawberries, mascarpone, maple syrup, powdered sugar",                  price: "9,95", tag: "Favourite" },
    { name: "Choco Hazelnut Bliss",   description: "Chocolate sauce, banana slices, roasted hazelnuts, powdered sugar",           price: "10,95" },
    { name: "Biscoff Dream",          description: "Lotus Biscoff spread, Biscoff cookie pieces, caramel sauce, powdered sugar",  price: "10,95" },
    { name: "Blueberry Cloud",        description: "Blueberry sauce, fresh blueberries, whipped cream, powdered sugar",           price: "9,95" },
  ],
  Crêpes: [
    { name: "Parisienne Strawberry", description: "Mascarpone, fresh strawberries, maple syrup, powdered sugar",                  price: "9,95" },
    { name: "Choco Banana",          description: "Rich chocolate, banana slices, chocolate sauce, powdered sugar",               price: "9,95", tag: "Popular" },
    { name: "Honey Almond",          description: "Natural honey, roasted almonds, buttery flavor",                               price: "10,95" },
    { name: "Biscoff Cinnamon",      description: "Lotus Biscoff cream, Biscoff cookie pieces, cinnamon",                        price: "10,95" },
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
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Something for Everyone</p>
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

                {/* Decorative border divider */}
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
