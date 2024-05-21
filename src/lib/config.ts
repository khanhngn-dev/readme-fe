const config = {
  supabase: {
    apiUrl: import.meta.env.VITE_SUPABASE_API_URL,
    publicKey: import.meta.env.VITE_SUPABASE_PUBLIC_API_KEY,
  },
} as const;

export default config;
