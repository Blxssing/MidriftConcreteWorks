CREATE TABLE public.reatech_api_throttle (
  scope text PRIMARY KEY,
  next_allowed_at timestamptz NOT NULL DEFAULT '-infinity'::timestamptz
);
GRANT ALL ON public.reatech_api_throttle TO service_role;
REVOKE ALL ON public.reatech_api_throttle FROM anon, authenticated;
ALTER TABLE public.reatech_api_throttle ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.claim_reatech_request()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed text;
BEGIN
  INSERT INTO public.reatech_api_throttle (scope, next_allowed_at)
  VALUES ('reatech_web_key', clock_timestamp() + interval '1 second')
  ON CONFLICT (scope) DO UPDATE
    SET next_allowed_at = clock_timestamp() + interval '1 second'
    WHERE reatech_api_throttle.next_allowed_at <= clock_timestamp()
  RETURNING scope INTO claimed;
  RETURN claimed IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_reatech_request() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_reatech_request() TO service_role;