-- Run this after supabase/schema.sql to create or repair a seed admin login.
-- Change the email and password below before using this in production.
--
-- If you already ran an older seed, this removes only the seed admin user below
-- and recreates it with a valid Supabase Auth password identity.

create extension if not exists pgcrypto;

do $$
declare
  seed_admin_user_id uuid := '11111111-1111-1111-1111-111111111111';
  seed_admin_email text := 'admin@example.com';
  seed_admin_password text := 'ChangeMe123!';
begin
  delete from public.admin_users
  where user_id = seed_admin_user_id
     or email = seed_admin_email;

  delete from auth.identities
  where user_id = seed_admin_user_id
     or identity_data ->> 'email' = seed_admin_email;

  delete from auth.users
  where id = seed_admin_user_id
     or email = seed_admin_email;

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
  values (
    '00000000-0000-0000-0000-000000000000',
    seed_admin_user_id,
    'authenticated',
    'authenticated',
    seed_admin_email,
    crypt(seed_admin_password, gen_salt('bf')),
    now(),
    null,
    '',
    null,
    '',
    null,
    '',
    '',
    null,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    now(),
    now(),
    null,
    null,
    '',
    '',
    null,
    '',
    0,
    null,
    '',
    null
  );

  insert into auth.identities (
    id,
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    seed_admin_user_id,
    seed_admin_user_id::text,
    seed_admin_user_id,
    jsonb_build_object('sub', seed_admin_user_id::text, 'email', seed_admin_email),
    'email',
    now(),
    now(),
    now()
  );

  insert into public.admin_users (user_id, email)
  values (seed_admin_user_id, seed_admin_email);
end $$;
