ALTER TABLE public.click_events DROP CONSTRAINT IF EXISTS click_events_event_type_check;
ALTER TABLE public.click_events ADD CONSTRAINT click_events_event_type_check CHECK (event_type = ANY (ARRAY[
  'wa_click','call_click','funnel_open','funnel_stage',
  'page_view','cta_click','triage_start','triage_step','triage_complete','triage_abandon',
  'whatsapp_open','lead_submitted','os_created','conversion','experiment_exposure'
]));