

import { Service, GalleryItem } from './types';

export const COMPANY_NAME = "Smith Studio";
export const COMPANY_PHONE = "+91 9738332209";
export const COMPANY_EMAIL = "---------";
export const COMPANY_ADDRESS = "Ring rd, Nijalingappa layout, Davanagere, Karnataka 577004, India";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/smith__photography_?igsh=MWpiY3ZtMWY0czRkaQ==";

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Wedding Photography',
    price: 150000,
    description: 'Full day coverage of your special day, capturing every emotional moment.',
    image: 'imgs/Id-4/smith__photography_-20251216-0023.jpg',
    features: ['8 Hours Coverage', '2 Photographers', 'Online Gallery', 'High-Res Downloads']
  },
  {
    id: '2',
    name: 'Pre-Wedding Shoot',
    price: 40000,
    description: 'Romantic couples session at a location of your choice.',
    image: 'imgs/Id-1/smith__photography_-20251216-0006.jpg',
    features: ['2 Hours Session', '2 Locations', '20 Retouched Photos', 'Outfit Changes']
  },
  {
    id: '3',
    name: 'Portrait Session',
    price: 15000,
    description: 'Professional headshots or creative portraits.',
    image: 'imgs/Id-0/varsha_k_putugnal-20251216-0002.jpg',
    features: ['1 Hour Session', 'Studio or Outdoor', '5 Retouched Photos', 'Quick Turnaround']
  },
  {
    id: '4',
    name: 'Event Videography',
    price: 90000,
    description: 'Cinematic highlight films for corporate events or parties.',
    image: 'imgs/Id-3/smith__photography_-20251216-0018.jpg',
    features: ['4K Video', 'Drone Footage', 'Highlight Reel', 'Raw Footage Option']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '0',
    type: 'set', // <--- New Type
    category: '',
    title: 'Varsha K Putugnal',
    coverUrl: 'imgs/Id-0/varsha_k_putugnal-20251216-0001.jpg', // The image shown in main grid
    // The array of images inside this set
    images: [
      { id: '0-1', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0001.jpg', title: '' },
      { id: '0-2', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0002.jpg', title: '' },
      { id: '0-3', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0003.jpg', title: '' },
      { id: '0-4', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0004.jpg', title: '' },
      { id: '0-5', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0005.jpg', title: '' },
      { id: '0-6', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0006.jpg', title: '' },
      { id: '0-7', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0007.jpg', title: '' },
      { id: '0-8', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0008.jpg', title: '' },
    ]
  },
    {
    id: '1',
    type: 'set',
    category: '',
    title: '',
    coverUrl: 'imgs/Id-1/smith__photography_-20251216-0001.jpg', 
    images: [
      { id: '1-1', url: 'imgs/Id-1/smith__photography_-20251216-0001.jpg', title: '' },
      { id: '1-2', url: 'imgs/Id-1/smith__photography_-20251216-0002.jpg', title: '' },
      { id: '1-3', url: 'imgs/Id-1/smith__photography_-20251216-0003.jpg', title: '' },
      { id: '1-4', url: 'imgs/Id-1/smith__photography_-20251216-0004.jpg', title: '' },
      { id: '1-5', url: 'imgs/Id-1/smith__photography_-20251216-0005.jpg', title: '' },
      { id: '1-6', url: 'imgs/Id-1/smith__photography_-20251216-0006.jpg', title: '' },
      { id: '1-7', url: 'imgs/Id-1/smith__photography_-20251216-0007.jpg', title: '' },
      { id: '1-8', url: 'imgs/Id-1/smith__photography_-20251216-0008.jpg', title: '' },
    ]
  },
   {
    id: '2',
    type: 'set',
    category: '',
    title: '',
    coverUrl: 'imgs/Id-2/smith__photography_-20251216-0009.jpg', 
    images: [
      { id: '2-1', url: 'imgs/Id-2/smith__photography_-20251216-0009.jpg', title: '' },
      { id: '2-2', url: 'imgs/Id-2/smith__photography_-20251216-0010.jpg', title: '' },
      { id: '2-3', url: 'imgs/Id-2/smith__photography_-20251216-0011.jpg', title: '' },
      { id: '2-4', url: 'imgs/Id-2/smith__photography_-20251216-0012.jpg', title: '' },
    ]
  },
     {
    id: '3',
    type: 'set',
    category: '',
    title: '',
    coverUrl: 'imgs/Id-3/smith__photography_-20251216-0013.jpg', 
    images: [
      { id: '3-1', url: 'imgs/Id-3/smith__photography_-20251216-0013.jpg', title: '' },
      { id: '3-2', url: 'imgs/Id-3/smith__photography_-20251216-0014.jpg', title: '' },
      { id: '3-3', url: 'imgs/Id-3/smith__photography_-20251216-0015.jpg', title: '' },
      { id: '3-4', url: 'imgs/Id-3/smith__photography_-20251216-0016.jpg', title: '' },
      { id: '3-5', url: 'imgs/Id-3/smith__photography_-20251216-0017.jpg', title: '' },
      { id: '3-6', url: 'imgs/Id-3/smith__photography_-20251216-0018.jpg', title: '' },
      { id: '3-7', url: 'imgs/Id-3/smith__photography_-20251216-0019.jpg', title: '' },
      { id: '3-8', url: 'imgs/Id-3/smith__photography_-20251216-0020.jpg', title: '' },
      { id: '3-9', url: 'imgs/Id-3/smith__photography_-20251216-0021.jpg', title: '' },
    ]
  },
      {
    id: '4',
    type: 'set',
    category: '',
    title: '',
    coverUrl: 'imgs/Id-4/smith__photography_-20251216-0022.jpg', 
    images: [
      { id: '4-1', url: 'imgs/Id-4/smith__photography_-20251216-0023.jpg', title: '' },
      { id: '4-2', url: 'imgs/Id-4/smith__photography_-20251216-0024.jpg', title: '' },
      { id: '4-3', url: 'imgs/Id-4/smith__photography_-20251216-0025.jpg', title: '' },
      { id: '4-4', url: 'imgs/Id-4/smith__photography_-20251216-0026.jpg', title: '' },
      { id: '4-5', url: 'imgs/Id-4/smith__photography_-20251216-0027.jpg', title: '' },
    ]
  }
  
];

export const LATEST_WORKS: GalleryItem[] = [
  { id: 'l1', title: 'Ethereal Bride', category: '', url: 'imgs/Id-0/varsha_k_putugnal-20251216-0001.jpg' },
  { id: 'l2', title: 'Fashion Week', category: '', url: 'imgs/Id-1/smith__photography_-20251216-0001.jpg' },
  { id: 'l3', title: 'Studio Session', category: '', url: 'imgs/Id-2/smith__photography_-20251216-0009.jpg' },
  { id: 'l4', title: 'Mountain Elopement', category: '', url: 'imgs/Id-3/smith__photography_-20251216-0013.jpg' },
  { id: 'l5', title: 'Neon Nights', category: '', url: 'imgs/Id-4/smith__photography_-20251216-0022.jpg' },
];