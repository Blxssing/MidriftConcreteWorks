-- All quote leads are written by the validated server function (service role),
-- which enforces the honeypot, rate limiting and duplicate protection.
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;
REVOKE INSERT ON public.quote_requests FROM anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;