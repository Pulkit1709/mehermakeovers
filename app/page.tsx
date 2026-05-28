'use client'

import { Hero } from '@/components/Hero'
import { Header } from '@/components/Header'
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Gallery } from '@/components/Gallery'
import { Reviews } from '@/components/Reviews'
import { Contact } from '@/components/Contact'
import { FloatingButtons } from '@/components/FloatingButtons'

export default function Page() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <Contact />
      <FloatingButtons />
    </main>
  )
}
