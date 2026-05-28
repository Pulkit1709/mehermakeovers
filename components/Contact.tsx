'use client'

import { FormEvent, useState } from 'react'
import { Calendar, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { brand, services, whatsappLink } from '@/lib/site-data'

export function Contact() {
  const [status, setStatus] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const service = String(form.get('service') ?? '').trim()
    const date = String(form.get('date') ?? '').trim()
    const note = String(form.get('note') ?? '').trim()

    if (!name || !phone || !service) {
      setStatus('Please add your name, phone number, and preferred service.')
      return
    }

    setStatus('Opening WhatsApp with your booking request.')
    window.open(
      whatsappLink(`Hi Meher Makeover, I want to book an appointment.
Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${date || 'Flexible'}
Notes: ${note || 'None'}`),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section id="booking" className="relative bg-background py-24 sm:py-32">
      {/* Background animation */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />

      <div className="luxury-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.34em] text-primary">Contact and booking</p>
            <h2 className="serif mt-4 text-balance text-5xl font-semibold leading-none sm:text-6xl">
              Reserve your private beauty appointment.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Send your preferred service and date. The team will confirm availability, pricing, and preparation details on WhatsApp.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2 }}
              className="mt-9 grid gap-4"
            >
              <Info icon={MapPin} label="Address" value={brand.address} href={brand.maps} />
              <Info icon={Phone} label="Phone" value={brand.phoneDisplay} href={brand.phoneHref} />
              <Info icon={MessageCircle} label="WhatsApp" value="Chat with the salon" href={brand.whatsapp} />
              <Info icon={Clock} label="Hours" value={brand.hours} />
            </motion.div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="border border-white/10 bg-card p-5 sm:p-8 transition duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
          >
            <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
              </div>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Service</span>
                <select
                  name="service"
                  required
                  className="min-h-12 border border-white/10 bg-background px-4 text-foreground outline-none transition duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Preferred date" name="date" type="date" icon />
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Notes</span>
                <textarea
                  name="note"
                  rows={4}
                  placeholder="Event type, timing, preferred look, or any questions"
                  className="resize-none border border-white/10 bg-background px-4 py-3 text-foreground outline-none transition duration-300 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
              {status && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="text-sm text-primary">
                  {status}
                </motion.p>
              )}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                type="submit"
                className="min-h-12 bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground transition duration-300 hover:bg-[#e3bf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Send booking request
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 overflow-hidden border border-white/10 bg-card"
        >
          <iframe
            title="Meher Makeover location on Google Maps"
            src="https://www.google.com/maps?q=20%20Church%20Road%20Surya%20Nagar%20Agra&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full"
          />
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3 }}
          id="contact"
          className="mt-12 border-t border-white/10 pt-8 text-sm text-muted-foreground"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <p>Copyright 2026 Meher Makeover. All rights reserved.</p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5"
            >
              <motion.a
                whileHover={{ color: '#d4af7f', x: 4 }}
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-primary transition duration-300 hover:text-foreground"
              >
                Instagram
              </motion.a>
              <motion.a
                whileHover={{ color: '#d4af7f', x: 4 }}
                href={brand.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-primary transition duration-300 hover:text-foreground"
              >
                WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ color: '#d4af7f', x: 4 }}
                href={brand.phoneHref}
                className="text-primary transition duration-300 hover:text-foreground"
              >
                Call
              </motion.a>
              <motion.a
                whileHover={{ color: '#d4af7f', x: 4 }}
                href={brand.maps}
                target="_blank"
                rel="noreferrer"
                className="text-primary transition duration-300 hover:text-foreground"
              >
                Maps
              </motion.a>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', autoComplete, required }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean; icon?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <motion.input
        whileFocus={{ boxShadow: '0 0 0 3px rgba(212,175,127,0.1)' }}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="min-h-12 border border-white/10 bg-background px-4 text-foreground outline-none transition duration-300 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  )
}

function Info({ icon: Icon, label, value, href }: { icon: typeof Calendar; label: string; value: string; href?: string }) {
  const content = (
    <motion.span whileHover={{ x: 4 }} className="flex gap-4 border border-white/10 bg-card p-5 transition duration-300 hover:border-primary/40 hover:bg-card/80">
      <motion.span whileHover={{ scale: 1.1, rotate: 12 }} className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground transition duration-300">
        <Icon aria-hidden className="size-5" />
      </motion.span>
      <span>
        <span className="block text-xs uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
        <span className="mt-1 block leading-6 text-foreground">{value}</span>
      </span>
    </motion.span>
  )

  return href ? (
    <motion.a
      whileHover={{ scale: 1.02 }}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {content}
    </motion.a>
  ) : (
    content
  )
}
