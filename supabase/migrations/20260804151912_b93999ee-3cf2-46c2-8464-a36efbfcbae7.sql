ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS gallery_urls text[] NOT NULL DEFAULT '{}'::text[];

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/a0d1c516-4884-4cb8-96db-b46a591a94ae/room-9.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/a0d1c516-4884-4cb8-96db-b46a591a94ae/room-9.png','/__l5e/assets-v1/791b7e57-487c-4484-abe3-0d5a161d98aa/room-12.png','/__l5e/assets-v1/6e74f296-d61e-4a87-a91a-c860ea7d0308/room-10.png']
 WHERE name = 'Standard Room';

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/1ec990e4-c258-4c6b-8612-33bb164814a0/room-11.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/1ec990e4-c258-4c6b-8612-33bb164814a0/room-11.png','/__l5e/assets-v1/791b7e57-487c-4484-abe3-0d5a161d98aa/room-12.png','/__l5e/assets-v1/6e74f296-d61e-4a87-a91a-c860ea7d0308/room-10.png']
 WHERE name = 'Standard Twin';

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/791b7e57-487c-4484-abe3-0d5a161d98aa/room-12.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/791b7e57-487c-4484-abe3-0d5a161d98aa/room-12.png','/__l5e/assets-v1/f7126c9b-089e-4630-b477-c7ec8a1b6bdf/room-15.png','/__l5e/assets-v1/1d83d918-a0c4-40b9-9f4c-5dc7538e5cb4/room-13.png']
 WHERE name = 'Deluxe Room';

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/1d83d918-a0c4-40b9-9f4c-5dc7538e5cb4/room-13.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/1d83d918-a0c4-40b9-9f4c-5dc7538e5cb4/room-13.png','/__l5e/assets-v1/f7126c9b-089e-4630-b477-c7ec8a1b6bdf/room-15.png','/__l5e/assets-v1/44d3a684-5509-42ad-a769-a0a365b78567/room-14.png']
 WHERE name = 'Deluxe Garden View';

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/44d3a684-5509-42ad-a769-a0a365b78567/room-14.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/44d3a684-5509-42ad-a769-a0a365b78567/room-14.png','/__l5e/assets-v1/f7126c9b-089e-4630-b477-c7ec8a1b6bdf/room-15.png','/__l5e/assets-v1/1d83d918-a0c4-40b9-9f4c-5dc7538e5cb4/room-13.png']
 WHERE name = 'VIP Suite';

UPDATE public.rooms SET image_url = '/__l5e/assets-v1/f7126c9b-089e-4630-b477-c7ec8a1b6bdf/room-15.png',
 gallery_urls = ARRAY['/__l5e/assets-v1/f7126c9b-089e-4630-b477-c7ec8a1b6bdf/room-15.png','/__l5e/assets-v1/1ec990e4-c258-4c6b-8612-33bb164814a0/room-11.png','/__l5e/assets-v1/a0d1c516-4884-4cb8-96db-b46a591a94ae/room-9.png']
 WHERE name = 'Family Room';