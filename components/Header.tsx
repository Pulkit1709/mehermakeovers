'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { whatsappLink } from '@/lib/site-data'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Booking', href: '#booking' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const current = ['services', 'about', 'gallery', 'reviews', 'booking'].find(
        (id) => {
          const el = document.getElementById(id)
          if (!el) return false

          const rect = el.getBoundingClientRect()
          return rect.top <= 140 && rect.bottom >= 140
        }
      )

      setActive(current ?? 'home')
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-white/10 bg-background/60 shadow-2xl shadow-black/40 backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="luxury-container flex min-h-20 items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-3 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image
              src="/logo.png"
              alt="Meher Makeover logo"
              width={48}
              height={48}
              priority
              className="h-11 w-auto"
            />
          </motion.div>

          <span className="hidden sm:block">
            <span className="serif block text-xl leading-none text-foreground">
              Meher Makeover
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-primary">
              Luxury salon
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-3 text-xs uppercase tracking-[0.24em] transition duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {link.label}

                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-x-4 bottom-2 h-px bg-primary"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            href={whatsappLink(
              'Hi, I want to book an appointment at Meher Makeover.'
            )}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-primary/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary transition duration-300 hover:border-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:inline-flex"
          >
            Book now
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center border border-white/10 text-foreground transition duration-300 hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="luxury-container py-5">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block border-b border-white/8 py-4 text-sm uppercase tracking-[0.24em] text-foreground/80 transition duration-300 hover:text-primary"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href={whatsappLink(
                  'Hi, I want to book an appointment at Meher Makeover.'
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex min-h-12 items-center justify-center bg-primary px-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground transition duration-300 hover:bg-[#e3bf90]"
              >
                Book now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}