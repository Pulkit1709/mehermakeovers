'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, CalendarCheck, Sparkles } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { brand, whatsappLink } from '@/lib/site-data'

const stats = [
  { value: '10+', label: 'Years of artistry' },
  { value: '5k+', label: 'Clients styled' },
  { value: '4.9', label: 'Client rating' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-background pt-24"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,175,127,0.12),transparent_40%),radial-gradient(circle_at_75%_72%,rgba(184,138,68,0.08),transparent_35%)]" />

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-10 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute right-10 bottom-20 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
        />
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="luxury-container relative grid min-h-[calc(100svh-6rem)] items-center gap-12 pb-16 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-3xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.34em] text-primary transition duration-300 hover:border-primary/50 hover:bg-white/[0.06]"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles aria-hidden className="size-4" />
            </motion.span>

            Agra luxury salon
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="serif text-balance text-6xl font-semibold leading-[0.88] tracking-normal text-foreground sm:text-7xl lg:text-8xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Beauty with a
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.1,
              }}
              className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent"
            >
              couture finish.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {brand.name} creates bridal, hair, skin, nail, and occasion
            looks with quiet precision, premium products, and a private
            salon atmosphere.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
              href={whatsappLink(
                'Hi, I want to book an appointment at Meher Makeover.'
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground transition duration-300 hover:bg-[#e3bf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CalendarCheck aria-hidden className="size-4" />
              </motion.span>

              Book appointment
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#services"
                className="inline-flex min-h-12 items-center justify-center border border-white/12 px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-foreground transition duration-300 hover:border-primary/70 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 grid max-w-xl grid-cols-3 border-y border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                }}
                className="group py-5 pr-4 transition duration-300 hover:text-primary"
              >
                <div className="serif text-3xl text-primary transition duration-300 group-hover:scale-110 sm:text-4xl">
                  {stat.value}
                </div>

                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative min-h-[520px] lg:min-h-[680px]"
        >
          {/* Premium frame effect */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-1 translate-x-5 translate-y-5 border border-primary/20"
          />

          <motion.div
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pointer-events-none absolute inset-0 border border-primary/10"
          />

          <div className="relative h-full min-h-[520px] overflow-hidden border border-white/10 bg-card">
            <Image
              src="/ai-saloon-interior.png"
              alt="AI-generated luxury salon interior at Meher Makeover in Agra"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

            {/* Premium floating card */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.02 }}
              className="absolute bottom-8 left-6 max-w-xs border border-white/12 bg-background/60 p-5 shadow-2xl shadow-primary/20 backdrop-blur-xl transition duration-300 hover:border-primary/50 sm:left-8"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-primary">
                Signature experience
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground/82">
                Private consultations, bespoke finish plans, and
                camera-conscious artistry for every event.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-primary transition duration-300 hover:text-primary/80 md:block"
      >
        <motion.span
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="block"
        >
          <ArrowDown className="size-6" />
        </motion.span>
      </a>
    </section>
  )
}