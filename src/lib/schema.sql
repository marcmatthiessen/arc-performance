-- Run this in your Supabase SQL editor

-- Profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  created_at timestamp with time zone default now()
);
alter table profiles enable row level security;
create policy "Users can view own profile"   on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Addresses
create table if not exists addresses (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references profiles(id) on delete cascade,
  label        text,
  full_name    text,
  street       text,
  number       text,
  complement   text,
  neighborhood text,
  city         text,
  state        text,
  zip_code     text,
  is_default   boolean default false,
  created_at   timestamp with time zone default now()
);
alter table addresses enable row level security;
create policy "Users can manage own addresses" on addresses for all using (auth.uid() = user_id);

-- Orders
create table if not exists orders (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references profiles(id),
  order_number     text unique,
  status           text default 'pending',
  total_amount     decimal,
  items            jsonb,
  shipping_address jsonb,
  created_at       timestamp with time zone default now(),
  updated_at       timestamp with time zone default now()
);
alter table orders enable row level security;
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
