export type Page = 'home' | 'services' | 'gallery' | 'book';

export type TreatmentCategory = 'cosmetic' | 'implants' | 'general';

export interface Service {
  id: string;
  title: string;
  category: TreatmentCategory;
  description: string;
  longDescription: string;
  duration: string;
  recovery: string;
  priceRange: string;
  iconName: string;
  benefits: string[];
}

export interface GalleryCase {
  id: string;
  title: string;
  treatment: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  timeframe: string;
  difficulty: 'Standard' | 'Moderate' | 'Advanced';
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  education: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  confirmationCode: string;
  createdAt: string;
}
