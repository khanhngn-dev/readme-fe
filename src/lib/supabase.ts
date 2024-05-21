import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/supabase';

import config from './config';

const supabase = createClient<Database>(
  config.supabase.apiUrl,
  config.supabase.publicKey,
);

export default supabase;
