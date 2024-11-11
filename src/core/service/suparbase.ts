import "react-native-url-polyfill";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.EXPO_PUBLIC_API_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY;
export const suparbaseConnetion = createClient(supabaseUrl, supabaseAnonKey);
