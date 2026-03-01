import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { QamariyaDivider } from "@/components/YemeniMotifs";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Amazing lunchroom! The pancakes with strawberries and Nutella are incredible and the atmosphere is so warm and cozy. Will definitely be back!",
    date: "February 2026",
  },
  {
    name: "Thomas K.",
    rating: 5,
    text: "Best coffee in Zaandam! The Maya Latte is a must-try. The staff is super friendly and the interior is beautifully decorated.",
    date: "January 2026",
  },
  {
    name: "Aigerim B.",
    rating: 5,
    text: "The Turkish Menemen for breakfast is authentic and delicious. Love the little personal touches throughout the café. A true hidden gem.",
    date: "February 2026",
  },
  {
    name: "Joost V.",
    rating: 4,
    text: "Lovely spot right on Stadhuisplein. Great food, lovely ambiance. The crepes with Nutella are absolutely heavenly — I'll be back for more!",
    date: "January 2026",
  },
  {
    name: "Emma L.",
    rating: 5,
    text: "My new favourite café in Zaandam. Everything is fresh and made with care. Highly recommend the rainbow cake — it's as beautiful as it is delicious!",
    date: "December 2025",
  },
  {
    name: "Mehmet A.",
    rating: 5,
    text: "The terrace outside is perfect on sunny days. Fresh quality food at fair prices and very warm, welcoming service. Feels like a home away from home.",
    date: "January 2026",
  },
];

const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < reviews.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const review = reviews[index];

  return (
    <section id="reviews" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">What Our Guests Say</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider mb-6">Reviews</h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative px-8 sm:px-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-8 sm:p-12 text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-primary fill-primary" />
                  ))}
                </div>

                <QamariyaDivider className="mb-8" />

                <p className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg italic mb-8">
                  "{review.text}"
                </p>

                <QamariyaDivider className="mb-6" />

                <p className="font-display text-lg tracking-wider gold-gradient-text">{review.name}</p>
                <p className="text-xs text-muted-foreground tracking-widest mt-1">{review.date}</p>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              disabled={index === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              disabled={index === reviews.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-primary w-6" : "bg-border w-2 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
