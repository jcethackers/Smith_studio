

import { Service, GalleryItem } from './types';

export const COMPANY_NAME = "Smith Studio";
export const COMPANY_PHONE = "+91 95138 09936";
export const COMPANY_EMAIL = "shashankshendre@gmail.com";
export const COMPANY_ADDRESS = "Ring rd, Nijalingappa layout, Davanagere, Karnataka 577004, India";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/smith__photography_?igsh=MWpiY3ZtMWY0czRkaQ==";

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Wedding Photography',
    price: 150000,
    description: 'Full day coverage of your special day, capturing every emotional moment.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    features: ['8 Hours Coverage', '2 Photographers', 'Online Gallery', 'High-Res Downloads']
  },
  {
    id: '2',
    name: 'Pre-Wedding Shoot',
    price: 40000,
    description: 'Romantic couples session at a location of your choice.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    features: ['2 Hours Session', '2 Locations', '20 Retouched Photos', 'Outfit Changes']
  },
  {
    id: '3',
    name: 'Portrait Session',
    price: 15000,
    description: 'Professional headshots or creative portraits.',
    image: 'imgs/2025-12-13 (1).png',
    features: ['1 Hour Session', 'Studio or Outdoor', '5 Retouched Photos', 'Quick Turnaround']
  },
  {
    id: '4',
    name: 'Event Videography',
    price: 90000,
    description: 'Cinematic highlight films for corporate events or parties.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80',
    features: ['4K Video', 'Drone Footage', 'Highlight Reel', 'Raw Footage Option']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', title: 'Sunset Vows', category: 'Wedding', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80' },
  { id: '2', title: 'Urban Portrait', category: 'Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
  { id: '3', title: 'Forest Love', category: 'Pre-Wedding', url: 'https://images.unsplash.com/photo-1621623403673-9828dc365751?auto=format&fit=crop&w=1200&q=80' },
  { id: '4', title: 'Studio Lights', category: 'Portrait', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80' },
  { id: '5', title: 'The First Dance', category: 'Wedding', url: 'https://images.unsplash.com/photo-1507038772120-7a5547543163?auto=format&fit=crop&w=1200&q=80' },
  { id: '6', title: 'Golden Hour', category: 'Landscape', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80' },
  { id: '7', title: 'Bridal Preparation', category: 'Wedding', url: 'https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&w=1200&q=80' },
  { id: '8', title: 'Candid Laughter', category: 'Event', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80' },
  { id: '9', title: 'Drone View', category: 'Landscape', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80' },
];

export const LATEST_WORKS: GalleryItem[] = [
  { id: 'l1', title: 'Ethereal Bride', category: 'Wedding', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 'l2', title: 'Fashion Week', category: 'Fashion', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  { id: 'l3', title: 'Studio Session', category: 'Portrait', url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=800&q=80' },
  { id: 'l4', title: 'Mountain Elopement', category: 'Pre-Wedding', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80' },
  { id: 'l5', title: 'Neon Nights', category: 'Urban', url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80' },
  { id: 'l6', title: 'Vintage Soul', category: 'Portrait', url: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?auto=format&fit=crop&w=800&q=80' },
  { id: 'l7', title: 'Industrial Chic', category: 'Architecture', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80' },
  { id: 'l8', title: 'Wildflowers', category: 'Nature', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
  { id: 'l9', title: 'City Motion', category: 'Urban', url: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=800&q=80' },
  { id: 'l10', title: 'Morning Coffee', category: 'Lifestyle', url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80' },
  { id: 'l11', title: 'Abstract Light', category: 'Art', url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80' },
  { id: 'l12', title: 'The Gaze', category: 'Portrait', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80' },
  { id: 'l13', title: 'Hidden Details', category: 'Macro', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
  { id: 'l14', title: 'Monochrome Street', category: 'Street', url: 'https://images.unsplash.com/photo-1478131333081-3091e1c0e6a7?auto=format&fit=crop&w=800&q=80' },
  { id: 'l15', title: 'Luxury Timepiece', category: 'Product', url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80' },
  { id: 'l16', title: 'Coastal Aerial', category: 'Drone', url: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=80' },
  { id: 'l17', title: 'In Motion', category: 'Sports', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' }
];