import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Service = {
  id: string
  name: string
  description: string
  category: string
  price: number
  duration: number
  image_url: string
}

export type Booking = {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  service_id: string
  booking_date: string
  booking_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export type GalleryImage = {
  id: string
  title: string
  category: string
  image_url: string
  image_thumb_url: string
  created_at: string
}

export type Review = {
  id: string
  customer_name: string
  rating: number
  message: string
  service: string
  created_at: string
}
