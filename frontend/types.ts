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
  url: string;
  title: string;
  category: string;
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