'use client'

import { useState } from 'react'
import { Instagram, MessageCircle, Phone, Plus, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand, whatsappLink } from '@/lib/site-data'

const actions = [
  { label: 'WhatsApp', href: whatsappLink('Hi, I am interested in Meher Makeover services.'), icon: MessageCircle },
  { label: 'Instagram', href: brand.instagram, icon: Instagram },
  { label: 'Call', href: brand.phoneHref, icon: Phone },
]

export function FloatingButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-3 grid gap-3"
          >
            {actions.map(({ label, href, icon: Icon }, index) => (
              <motion.a
                key={label}
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 16 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, x: 8 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="group flex items-center justify-end gap-3"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="hidden border border-white/10 bg-background/80 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground shadow-xl backdrop-blur-xl transition duration-300 group-hover:border-primary/50 group-hover:text-primary sm:block"
                >
                  {label}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-12 items-center justify-center border border-primary/40 bg-card text-primary shadow-2xl shadow-primary/20 backdrop-blur-xl transition duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-primary/40"
                >
                  <Icon aria-hidden className="size-5" />
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Close contact actions' : 'Open contact actions'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        initial={{ scale: 1 }}
        animate={{ scale: open ? 1.05 : 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="flex size-14 items-center justify-center bg-primary text-primary-foreground shadow-2xl shadow-black/35 transition duration-300 hover:bg-[#e3bf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X aria-hidden className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Plus aria-hidden className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
