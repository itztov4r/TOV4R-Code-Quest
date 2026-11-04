-- Additive performance fix for existing deployments; no data changes.
create index if not exists cq_progress_mission_id_idx
  on public.cq_progress (mission_id);
