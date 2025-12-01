import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[]; // List of detailed capabilities
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  location: string;
  category: string;
}