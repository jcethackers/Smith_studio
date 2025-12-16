export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}
export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  
  // 1. Update type to include 'set'
  type?: 'image' | 'instagram' | 'set'; 

  // 2. Make url optional (because 'set' items use coverUrl instead)
  url?: string; 

  // 3. Add these new properties for the Album feature
  coverUrl?: string;  // The main photo shown in the gallery grid
  images?: {          // The array of photos inside the album
    id: string;
    url: string;
    title: string;
  }[];
}
export interface NavItem {
  label: string;
  path: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}