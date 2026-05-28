'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { galleryItems, whatsappLink } from '@/lib/site-data'

const categories = ['all', 'bridal', 'hair', 'skin', 'nails', 'studio']

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null)
  const filtered = selectedCategory === 'all' ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="gallery" className="relative bg-background py-24 sm:py-32">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
      />

      <div className="luxury-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-primary">Portfolio</p>
            <h2 className="serif mt-4 max-w-2xl text-balance text-5xl font-semibold leading-none sm:text-6xl">
              A cinematic lookbook of finished work.
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex max-w-full gap-2 overflow-x-auto pb-2"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-11 whitespace-nowrap border px-4 text-xs uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  selectedCategory === category
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'border-white/10 text-foreground/75 hover:border-primary/60 hover:text-primary'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                type="button"
                onClick={() => setActiveImage(item)}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden border border-white/10 bg-card text-left transition duration-300 hover:border-primary/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className={`relative block ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <motion.span
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.95 }}
                    className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition duration-300"
                  />
                  <span className="absolute bottom-4 left-4 right-4">
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="serif block text-2xl text-foreground"
                    >
                      {item.title}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mt-2 block text-xs uppercase tracking-[0.24em] text-primary"
                    >
                      View detail
                    </motion.span>
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <Dialog open={Boolean(activeImage)} onOpenChange={(open) => !open && setActiveImage(null)}>
            <DialogContent className="max-w-5xl border-white/10 bg-background p-0 text-foreground">
              <DialogTitle className="sr-only">{activeImage?.title}</DialogTitle>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]"
              >
                <div className="relative min-h-[420px]">
                  <Image
                    src={activeImage.image}
                    alt={activeImage.title}
                    fill
                    sizes="70vw"
                    className="object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 sm:p-10"
                >
                  <p className="text-xs uppercase tracking-[0.34em] text-primary">{activeImage.category}</p>
                  <h3 className="serif mt-4 text-4xl leading-none">{activeImage.title}</h3>
                  <p className="mt-5 leading-8 text-muted-foreground">
                    Explore a consultation-led finish inspired by this look. The final plan is customized for your skin, hair, outfit, event lighting, and comfort.
                  </p>
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    href={whatsappLink(`Hi, I am interested in a look like ${activeImage.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex min-h-12 items-center justify-center bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground transition duration-300 hover:bg-[#e3bf90]"
                  >
                    Inquire now
                  </motion.a>
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
