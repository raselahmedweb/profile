import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: string;
  long_description: string | null;
  status: "live" | "in_progress" | "archived";
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
  apk_url: string | null;
  url: string;
  project_type: "web" | "mobile" | "backend" | "fullstack";
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: Date;
};

export const CONTACT_INFO = {
  email: "itrasel75@gmail.com",
  phone: "+966572746302",
  website: "rasell.online",
  github: "https://github.com/raselahmedweb",
};
