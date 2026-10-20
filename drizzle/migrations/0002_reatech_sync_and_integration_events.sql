DO $$ BEGIN
  CREATE TYPE public.reatech_sync_status AS ENUM ('pending','skipped_no_email','not_configured','submitted','failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.crm_lead_status AS ENUM ('unconfirmed','confirmed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS idempotency_key uuid,
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS delivery_mode text,
  ADD COLUMN IF NOT EXISTS site_access text,
  ADD COLUMN IF NOT EXISTS offloading_needed text,
  ADD COLUMN IF NOT EXISTS consent_contact boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_marketing boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS pricing_status text NOT NULL DEFAULT 'quotation_required',
  ADD COLUMN IF NOT EXISTS reatech_sync_status public.reatech_sync_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS reatech_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS reatech_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS reatech_last_error text,
  ADD COLUMN IF NOT EXISTS reatech_submission_ref text,
  ADD COLUMN IF NOT EXISTS crm_lead_status public.crm_lead_status NOT NULL DEFAULT 'unconfirmed';

CREATE UNIQUE INDEX IF NOT EXISTS quote_requests_idempotency_key_uidx
  ON public.quote_requests (idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS quote_requests_sync_idx ON public.quote_requests (reatech_sync_status);

CREATE POLICY "Sales can view quote requests" ON public.quote_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'sales'::public.app_role));
CREATE POLICY "Sales can update quote requests" ON public.quote_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'sales'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'sales'::public.app_role));

CREATE TABLE IF NOT EXISTS public.integration_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_request_id uuid REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  provider text NOT NULL,
  operation text NOT NULL,
  outcome text NOT NULL,
  http_status integer,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.integration_events TO authenticated;
GRANT ALL ON public.integration_events TO service_role;
ALTER TABLE public.integration_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins and sales can view integration events" ON public.integration_events
  FOR SELECT TO authenticated USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'sales'::public.app_role)
  );
CREATE INDEX IF NOT EXISTS integration_events_quote_idx ON public.integration_events (quote_request_id, created_at DESC);