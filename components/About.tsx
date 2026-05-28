'use client'

import Image from 'next/image'
import { Award, Gem, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { whatsappLink } from '@/lib/site-data'

const pillars = [
  { icon: Award, title: 'Expert artists', text: 'Senior professionals across bridal, hair, skin, nail, and occasion beauty.' },
  { icon: Gem, title: 'Premium products', text: 'A curated product wardrobe selected for finish, comfort, and wear time.' },
  { icon: ShieldCheck, title: 'Refined hygiene', text: 'Clean tools, calm rituals, and thoughtful appointment pacing.' },
]

export function About() {
  return (
    <section id="about" className="relative border-y border-white/10 bg-card py-24 sm:py-32">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />

      <div className="luxury-container relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-4 -top-4 h-full w-full border border-primary/30"
          />
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-background sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/salon-interior.jpg"
              alt="Private luxury salon space at Meher Makeover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.34em] text-primary">The house of Meher</p>
          <h2 className="serif mt-4 text-balance text-5xl font-semibold leading-none sm:text-6xl">
            A calm, exacting salon for luminous transformations.
          </h2>
          <p className="mt-7 text-base leading-8 text-muted-foreground">
            Meher Makeover is built for clients who want beauty work to feel personal, polished, and considered. From bridal looks to everyday maintenance, the experience is intentionally unhurried and detail driven.
          </p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Our artists balance modern technique with soft, wearable elegance, creating finishes that photograph beautifully without losing the person underneath.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.3 }}
            className="mt-9 grid gap-4"
          >
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 border border-white/10 bg-background/45 p-5 transition duration-300 hover:border-primary/30 hover:bg-background/60"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: 12 }}
                  className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground transition duration-300"
                >
                  <Icon aria-hidden className="size-5" />
                </motion.span>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -4 }}
            whileTap={{ y: 0 }}
            href={whatsappLink('Hi, I want a consultation at Meher Makeover.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground transition duration-300 hover:bg-[#e3bf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Plan a consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
