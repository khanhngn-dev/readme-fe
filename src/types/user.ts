import { OptionalNullable } from './helper';
import { Tables } from './supabase';

export type User = OptionalNullable<Tables<'users'>>;
