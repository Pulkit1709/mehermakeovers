'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { reviews } from '@/lib/site-data'

export function Reviews() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((value) => (value + 1) % reviews.length)
    }, 5200)
    return () => window.clearInterval(interval)
  }, [])

  const active = reviews[index]

  return (
    <section id="reviews" className="relative border-y border-white/10 bg-card py-24 sm:py-32">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute left-1/3 top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />

      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-primary">Social proof</p>
            <h2 className="serif mt-4 text-balance text-5xl font-semibold leading-none sm:text-6xl">
              Loved for detail, calm, and polish.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Clients choose Meher Makeover for work that feels elevated without losing softness, comfort, or personal expression.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overflow-hidden border border-white/10 bg-background p-6 sm:p-9 transition duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="mb-7 flex items-center justify-between gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex gap-1 text-primary"
                aria-label="5 star rating"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <motion.span
                    key={starIndex}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, delay: starIndex * 0.2 }}
                  >
                    <Star aria-hidden className="size-5 fill-current" />
                  </motion.span>
                ))}
              </motion.div>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                <CheckCircle2 aria-hidden className="size-4 text-primary" />
                Verified client
              </motion.span>
            </div>

            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.blockquote
                  className="serif text-balance text-3xl leading-tight text-foreground sm:text-4xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  "{active.text}"
                </motion.blockquote>
                <motion.figcaption
                  className="mt-8 flex items-center gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition duration-300 hover:bg-[#e3bf90]"
                  >
                    {active.initials}
                  </motion.span>
                  <span>
                    <span className="block font-semibold">{active.name}</span>
                    <span className="text-sm text-muted-foreground">{active.service}</span>
                  </span>
                </motion.figcaption>
              </motion.figure>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-9 flex gap-2"
            >
              {reviews.map((review, reviewIndex) => (
                <motion.button
                  key={review.name}
                  type="button"
                  aria-label={`Show review from ${review.name}`}
                  onClick={() => setIndex(reviewIndex)}
                  whileHover={{ scaleY: 1.5 }}
                  whileTap={{ scaleY: 1 }}
                  className={`h-1.5 flex-1 origin-left transition duration-300 ${
                    reviewIndex === index ? 'bg-primary' : 'bg-white/12 hover:bg-white/30'
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
