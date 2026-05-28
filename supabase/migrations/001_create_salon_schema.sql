-- Salon Management Schema for Meher Makeover

-- Services table
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time slots table (for availability)
CREATE TABLE time_slots (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  service_id BIGINT REFERENCES services(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified_client BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_featured ON services(featured);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_time_slots_date ON time_slots(date);
CREATE INDEX idx_time_slots_available ON time_slots(is_available);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(client_email);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Sample services data
INSERT INTO services (name, category, description, price, duration_minutes, featured) VALUES
  ('Bridal Makeup', 'Makeup', 'Complete bridal makeup with contouring, eyeshadow, and long-lasting finishes', 8000, 120, true),
  ('Bridal Hairstyle', 'Hair', 'Elegant bridal hairstyles with extensions and accessories', 6000, 90, true),
  ('Facial Treatment', 'Skin', 'Premium facial with cleansing, exfoliation, and moisturizing', 3500, 60, true),
  ('Hair Treatment', 'Hair', 'Deep conditioning and hair spa treatment', 4000, 90, false),
  ('Nail Art', 'Nails', 'Custom nail design and extension service', 2500, 60, true),
  ('Makeup Touch-up', 'Makeup', 'Professional makeup application for special events', 4000, 45, false),
  ('Skin Treatment Package', 'Skin', 'Complete skin care regimen with products included', 12000, 180, false);

-- Enable RLS (Row Level Security)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for services and gallery
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Gallery is viewable by everyone" ON gallery FOR SELECT USING (true);
CREATE POLICY "Time slots are viewable by everyone" ON time_slots FOR SELECT USING (true);
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

-- Anyone can insert bookings
CREATE POLICY "Anyone can create bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Anyone can insert reviews
CREATE POLICY "Anyone can create reviews" ON reviews FOR INSERT WITH CHECK (true);
