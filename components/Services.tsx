'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { easeOut } from 'motion-utils'
import { services, whatsappLink } from '@/lib/site-data'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export function Services() {
  return (
    <section id="services" className="relative bg-background py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-primary">The service edit</p>
            <h2 className="serif mt-4 max-w-xl text-balance text-5xl font-semibold leading-none sm:text-6xl">
              Rituals designed like couture.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Every appointment begins with a consultation, then moves through detail-led technique, luxury products, and a finish planned for real life, photography, and long-wear comfort.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          variants={containerVariants}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group overflow-hidden border border-white/10 bg-card transition duration-500 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} at Meher Makeover`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition duration-500 group-hover:from-background/80" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/5"
                />
                <div className="absolute left-5 top-5 border border-white/12 bg-background/60 px-3 py-2 text-xs uppercase tracking-[0.22em] text-primary backdrop-blur-xl transition duration-300 group-hover:border-primary/50 group-hover:bg-background/80">
                  {service.shortTitle}
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="serif text-3xl leading-none text-foreground">{service.title}</h3>
                  <motion.span
                    animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-1 size-5 shrink-0 text-primary transition group-hover:scale-125"
                  >
                    <ArrowUpRight aria-hidden />
                  </motion.span>
                </div>
                <p className="mt-4 min-h-24 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
                  <span className="font-semibold text-primary transition duration-300 group-hover:text-[#e3bf90]">
                    {service.price}
                  </span>
                  <span className="text-muted-foreground">{service.duration}</span>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={whatsappLink(`Hi, I am interested in ${service.title}. Can you help me book?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center border border-primary/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary transition duration-300 hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Book this service
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
