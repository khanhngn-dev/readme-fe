/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_API_URL: string;
  readonly VITE_SUPABASE_PUBLIC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
