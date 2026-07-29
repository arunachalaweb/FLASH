-- 1) Hide staff email from public/anonymous readers.
--    RLS is row-level; use column-level GRANT to remove the email column from anon reads.
REVOKE SELECT (email) ON public.team_members FROM anon;

-- 2) Tighten SECURITY DEFINER function execute grants.
--    handle_new_user and tg_set_updated_at are trigger-only; no role needs EXECUTE.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;

--    has_role is used inside RLS policies evaluated as the invoking role,
--    so authenticated must retain EXECUTE, but anon does not need it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;