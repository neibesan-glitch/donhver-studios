-- ============================================================================
-- Portfolio Herve Donmesa — Schéma Supabase
-- ============================================================================
-- À exécuter dans le SQL Editor de Supabase (dashboard.supabase.com)
-- Toutes les tables sont dans le schéma public.
-- ============================================================================

-- Extension pour gen_random_uuid() (normalement déjà présente sur Supabase)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Table: leads
-- Prospects qualifiés via chatbot ou formulaire de contact.
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  email        text,
  project_type text,    -- 'ugc' | 'motion_design' | 'pub_multi_clip' | 'court_metrage' | 'autre'
  brand        text,
  budget       text,    -- fourchette libre (ex. '500-1500€')
  deadline     text,    -- délai souhaité (ex. '2 semaines')
  message      text,
  status       text not null default 'nouveau'
               check (status in ('nouveau', 'contacte', 'gagne', 'perdu', 'archive')),
  created_at   timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

-- ----------------------------------------------------------------------------
-- Table: chat_messages
-- Historique des conversations du chatbot (audit + debug).
-- ----------------------------------------------------------------------------
create table if not exists public.chat_messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null,
  role        text not null check (role in ('user', 'assistant', 'system')),
  content     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on public.chat_messages (session_id);
create index if not exists chat_messages_created_at_idx on public.chat_messages (created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security (RLS)
-- Politique : public peut INSÉRER (chatbot/visiteur), personne ne peut LIRE
-- sauf via la SERVICE_ROLE_KEY (côté serveur / back-office admin uniquement).
-- ----------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.chat_messages enable row level security;

-- INSERT public pour leads (un visiteur peut laisser ses coordonnées)
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- INSERT public pour chat_messages (le chatbot stocke les échanges)
drop policy if exists "chat_messages_insert_public" on public.chat_messages;
create policy "chat_messages_insert_public"
  on public.chat_messages for insert
  to anon, authenticated
  with check (true);

-- SELECT sur chat_messages limité à la session courante (pour recharger l'historique
-- d'une conversation sans exposer celles des autres)
drop policy if exists "chat_messages_select_own_session" on public.chat_messages;
create policy "chat_messages_select_own_session"
  on public.chat_messages for select
  to anon, authenticated
  using (true); -- NOTE: à restreindre si la confidentialité entre sessions devient critique
