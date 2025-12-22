import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovvlurnjixcsyhocmxtv.supabase.co';
const supabaseKey = 'sb_publishable_SGfGCwUzyyC_889m4PD71A_VXlqxvo8'; // Substitua pela chave 'anon' se esta não funcionar

export const supabase = createClient(supabaseUrl, supabaseKey);
