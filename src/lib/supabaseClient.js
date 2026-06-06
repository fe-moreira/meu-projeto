import { createClient } from '@supabase/supabase-js'

// As credenciais são lidas das variáveis de ambiente (arquivo .env).
// A publishable key é segura para uso no client — o acesso aos dados é
// controlado pelas políticas de Row Level Security (RLS) no Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Variáveis de ambiente do Supabase ausentes. ' +
      'Copie .env.example para .env e preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
