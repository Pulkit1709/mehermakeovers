export const brand = {
  name: 'Meher Makeover',
  descriptor: 'Luxury Unisex Salon',
  phoneDisplay: '+91 8057067771',
  phoneHref: 'tel:+918057067771',
  whatsapp: 'https://wa.me/918057067771',
  instagram: 'https://instagram.com/makeoverbymeher',
  address: '20, Church Road, Next to Mansi Store, Surya Nagar, Agra - 282002',
  maps: 'https://maps.google.com/?q=20+Church+Road+Surya+Nagar+Agra',
  hours: 'Open daily, 10:00 AM - 8:00 PM',
}

export const services = [
  {
    id: 'bridal',
    title: 'Bridal Couture Beauty',
    shortTitle: 'Bridal',
    description: 'Bespoke bridal makeup, hair artistry, draping, and pre-event glow rituals for camera-ready elegance.',
    image: '/bridal-makeup.png',
    price: 'Custom quote',
    duration: 'Consultation led',
  },
  {
    id: 'hair',
    title: 'Signature Hair Atelier',
    shortTitle: 'Hair',
    description: 'Precision cuts, color, styling, smoothing, extensions, and restorative treatments.',
    image: '/hair-styling.png',
    price: 'From Rs. 500',
    duration: '45-180 min',
  },
  {
    id: 'makeup',
    title: 'Editorial Makeup',
    shortTitle: 'Makeup',
    description: 'Polished party, occasion, engagement, and soft glam looks created around your features.',
    image: '/bridal-makeup.png',
    price: 'From Rs. 800',
    duration: '60-120 min',
  },
  {
    id: 'nails',
    title: 'Nail Art Studio',
    shortTitle: 'Nails',
    description: 'Manicures, pedicures, gel finishes, extensions, and custom detail work.',
    image: '/nail-art.png',
    price: 'From Rs. 400',
    duration: '40-120 min',
  },
  {
    id: 'skin',
    title: 'Skin Rituals',
    shortTitle: 'Skin',
    description: 'Facials, cleanups, glow therapies, and targeted skin treatments selected after consultation.',
    image: '/skin-treatment.png',
    price: 'From Rs. 600',
    duration: '45-90 min',
  },
  {
    id: 'spa',
    title: 'Relaxation Therapy',
    shortTitle: 'Spa',
    description: 'Head massage, body spa, and calming wellness rituals for a softer reset.',
    image: '/ai-saloon-interior.png',
    price: 'From Rs. 700',
    duration: '30-90 min',
  },
]

export const galleryItems = [
  { id: 1, category: 'bridal', title: 'Bridal Glow Finish', image: '/bridal-makeup.png', tall: true },
  { id: 2, category: 'hair', title: 'Soft Luxury Waves', image: '/hair-styling.png' },
  { id: 3, category: 'skin', title: 'Radiance Ritual', image: '/skin-treatment.png', tall: true },
  { id: 4, category: 'nails', title: 'Champagne Nail Detail', image: '/nail-art.png' },
  { id: 5, category: 'bridal', title: 'Ceremony Ready', image: '/bridal-makeup.png' },
  { id: 6, category: 'studio', title: 'Private Salon Suite', image: '/ai-saloon-interior.png' },
]

export const reviews = [
  {
    name: 'Priya Sharma',
    initials: 'PS',
    service: 'Bridal Makeup',
    text: 'My bridal makeup was flawless from the first photo to the final ceremony. Calm, precise, and beautifully luxurious.',
  },
  {
    name: 'Anjali Verma',
    initials: 'AV',
    service: 'Hair Treatment',
    text: 'The team understood my hair instantly. The finish felt expensive, healthy, and easy to maintain.',
  },
  {
    name: 'Neha Patel',
    initials: 'NP',
    service: 'Complete Package',
    text: 'The attention to detail is unmatched in Agra. Every step felt thoughtful and incredibly polished.',
  },
  {
    name: 'Divya Singh',
    initials: 'DS',
    service: 'Nail Art',
    text: 'Elegant nail art without feeling overdone. They translated my idea into something much more refined.',
  },
]

export function whatsappLink(message: string) {
  return `${brand.whatsapp}?text=${encodeURIComponent(message)}`
}
