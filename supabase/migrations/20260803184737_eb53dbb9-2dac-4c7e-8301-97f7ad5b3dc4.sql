CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_am TEXT,
  category TEXT NOT NULL DEFAULT 'Standard',
  description TEXT,
  price_per_night NUMERIC(10,2) NOT NULL DEFAULT 0,
  capacity INTEGER NOT NULL DEFAULT 2,
  bed_type TEXT,
  size_sqm INTEGER,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.rooms TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rooms are publicly viewable" ON public.rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff can insert rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Staff can update rooms" ON public.rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Staff can delete rooms" ON public.rooms FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.rooms (name, name_am, category, description, price_per_night, capacity, bed_type, size_sqm, amenities, image_url, is_available, sort_order) VALUES
('Standard Room', 'መደበኛ ክፍል', 'Standard', 'A calm, sunlit room with everything you need for a restful night in Butajira — hot shower, fast Wi-Fi and daily housekeeping.', 1800, 2, 'Queen bed', 22, ARRAY['En-suite bathroom','Smart TV','Free Wi-Fi','Daily housekeeping'], '/__l5e/assets-v1/0c3fb5d3-b93a-4745-aecc-196840f6848e/image-2.png', true, 1),
('Standard Twin', 'መደበኛ ሁለት አልጋ', 'Standard', 'Two comfortable single beds, ideal for colleagues travelling together or friends on a short stay.', 2000, 2, 'Two single beds', 24, ARRAY['En-suite bathroom','Work desk','Free Wi-Fi','Room service'], '/__l5e/assets-v1/1deeb529-134f-4e34-bf28-e548bcbfdde9/image.png', true, 2),
('Deluxe Room', 'ዲላክስ ክፍል', 'Deluxe', 'Extra space, a private balcony and a generous king bed — our most popular choice for longer stays.', 2900, 3, 'King bed', 32, ARRAY['Private balcony','Breakfast included','Work desk','Smart TV','Free Wi-Fi'], '/__l5e/assets-v1/0c3fb5d3-b93a-4745-aecc-196840f6848e/image-2.png', true, 3),
('Deluxe Garden View', 'የአትክልት እይታ ዲላክስ', 'Deluxe', 'Wake to the green of our tukul garden from a quiet corner of the hotel.', 3200, 3, 'King bed', 34, ARRAY['Garden view','Breakfast included','Seating area','Mini fridge'], '/__l5e/assets-v1/0c3fb5d3-b93a-4745-aecc-196840f6848e/image-2.png', true, 4),
('VIP Suite', 'ቪአይፒ ስዊት', 'Suite', 'A separate living room, garden views and airport pickup — our finest accommodation for guests who want space and privacy.', 4500, 4, 'King + sofa bed', 55, ARRAY['Living room','Garden view','Airport pickup','Breakfast included','Bathtub'], '/__l5e/assets-v1/1deeb529-134f-4e34-bf28-e548bcbfdde9/image.png', true, 5),
('Family Room', 'የቤተሰብ ክፍል', 'Family', 'Room for the whole family, with connecting beds and plenty of storage for longer holidays.', 3800, 5, 'King + two singles', 45, ARRAY['Extra beds','Breakfast included','Smart TV','Free Wi-Fi','Secure parking'], '/__l5e/assets-v1/0c3fb5d3-b93a-4745-aecc-196840f6848e/image-2.png', false, 6);