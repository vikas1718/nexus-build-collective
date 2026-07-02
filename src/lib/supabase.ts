import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: "Website" | "Web App" | "AI Integration" | "E-Commerce";
  budget: "$2k - $5k" | "$5k - $15k" | "$15k+";
  timeline?: string;
  reference_website?: string;
  message: string;
};