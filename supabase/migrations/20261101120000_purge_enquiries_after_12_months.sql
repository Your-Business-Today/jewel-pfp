-- The privacy notice keeps enquiries for 12 months. pg_cron deletes each one
-- 12 months after it arrived, every night at 03:15 UTC. Scheduling a job by a
-- name that already exists replaces it, so this file is safe to run twice.
create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'purge-enquiries-after-12-months',
  '15 3 * * *',
  $$delete from public.enquiries where created_at < now() - interval '12 months'$$
);
