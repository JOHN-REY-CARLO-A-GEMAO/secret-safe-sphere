// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eipzkbqauyqysmqkvdaj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpcHprYnFhdXlxeXNtcWt2ZGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Nzk2MzQsImV4cCI6MjA1NjU1NTYzNH0.CoN-EDxhMaH-GUURxq-JKzZRFvUR6x88ljZSGYJAweQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);