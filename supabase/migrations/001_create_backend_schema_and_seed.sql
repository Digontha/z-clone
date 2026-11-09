-- =================================================================
-- 1. JOBS TABLE & RLS
-- =================================================================
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  rate TEXT NOT NULL,
  rate_type TEXT NOT NULL DEFAULT 'Hourly',
  experience TEXT NOT NULL DEFAULT 'Intermediate',
  category TEXT NOT NULL DEFAULT 'Development & IT',
  time_posted TEXT NOT NULL DEFAULT 'Just now',
  duration TEXT NOT NULL DEFAULT '1 to 3 Months',
  description TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  client_name TEXT NOT NULL,
  country TEXT NOT NULL,
  payment_verified BOOLEAN DEFAULT true,
  bookmarked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view jobs" ON public.jobs;
CREATE POLICY "Public can view jobs" ON public.jobs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert jobs" ON public.jobs;
CREATE POLICY "Anyone can insert jobs" ON public.jobs
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update jobs" ON public.jobs;
CREATE POLICY "Anyone can update jobs" ON public.jobs
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete jobs" ON public.jobs;
CREATE POLICY "Anyone can delete jobs" ON public.jobs
  FOR DELETE USING (true);

-- =================================================================
-- 2. PROPOSALS TABLE & RLS
-- =================================================================
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT REFERENCES public.jobs(id) ON DELETE CASCADE,
  freelancer_name TEXT DEFAULT 'Elena Rostova',
  bid_rate TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view proposals" ON public.proposals;
CREATE POLICY "Public can view proposals" ON public.proposals
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert proposals" ON public.proposals;
CREATE POLICY "Anyone can insert proposals" ON public.proposals
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update proposals" ON public.proposals;
CREATE POLICY "Anyone can update proposals" ON public.proposals
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete proposals" ON public.proposals;
CREATE POLICY "Anyone can delete proposals" ON public.proposals
  FOR DELETE USING (true);

-- =================================================================
-- 3. CONVERSATIONS & MESSAGES TABLES & RLS
-- =================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id TEXT PRIMARY KEY,
  participant_name TEXT NOT NULL,
  participant_avatar TEXT,
  participant_role TEXT,
  last_message TEXT,
  last_message_time TEXT,
  unread_count INT DEFAULT 0,
  online BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view conversations" ON public.conversations;
CREATE POLICY "Public can view conversations" ON public.conversations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert conversations" ON public.conversations;
CREATE POLICY "Anyone can insert conversations" ON public.conversations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update conversations" ON public.conversations;
CREATE POLICY "Anyone can update conversations" ON public.conversations
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete conversations" ON public.conversations;
CREATE POLICY "Anyone can delete conversations" ON public.conversations
  FOR DELETE USING (true);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view messages" ON public.messages;
CREATE POLICY "Public can view messages" ON public.messages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
CREATE POLICY "Anyone can insert messages" ON public.messages
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update messages" ON public.messages;
CREATE POLICY "Anyone can update messages" ON public.messages
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can delete messages" ON public.messages;
CREATE POLICY "Anyone can delete messages" ON public.messages
  FOR DELETE USING (true);

-- =================================================================
-- 4. SEED INITIAL DATA
-- =================================================================
INSERT INTO public.jobs (
  id, title, rate, rate_type, experience, category, time_posted, duration, description, skills, client_name, country, payment_verified, bookmarked
) VALUES 
(
  'job-nlp',
  'Natural Language Processing Engineer Needed: Develop and Evaluate a Data-Driven Prediction Solution — $65/hr',
  '$65/hr',
  'Hourly',
  'Intermediate',
  'AI Services',
  'Posted 3h ago',
  '1 to 3 Months',
  'Our logistics team needs an experienced Natural Language Processing Engineer to develop and evaluate a data-driven prediction solution. Please deliver data and modeling plan and reproducible model or prototype, with clear progress updates. Send one relevant work example and your approach.',
  '["Text Analysis", "Model Training and Deployment", "Chatbot-based Support", "Virtual Customer Service AI", "Personalized Marketing", "Algorithmic Trading"]'::jsonb,
  'U-Topia',
  'United States',
  true,
  false
),
(
  'job-audio',
  'Audio Engineer Needed: Produce Clean, Broadcast-Ready Audio — $3,000 Fixed Price',
  '$3,000',
  'Fixed',
  'Expert',
  'Design & Creative',
  'Posted 3h ago',
  '1 to 3 Months',
  'PROJECT OVERVIEW Our travel team is preparing a new project and is looking for an experienced Audio Engineer to produce clean, broadcast-ready audio. The result should be practical, polished, and ready for real-world review. We want a freelancer who can understand the goal quickly.',
  '["Audio Editing", "Sound Design", "Audio Mastering", "Podcast Production", "Noise Reduction", "Acoustic Treatment"]'::jsonb,
  'Aura Media Studio',
  'United Kingdom',
  true,
  true
),
(
  'job-react-dashboard',
  'Senior React & TypeScript Engineer: Real-Time Usage & Billing Dashboard',
  '$75/hr',
  'Hourly',
  'Expert',
  'Development & IT',
  'Posted 4h ago',
  '3 to 6 Months',
  'We are seeking a seasoned frontend architect to develop an ultra-responsive billing, telemetry, and analytics dashboard with Stripe integration, WebSocket live metrics, and role-based access management.',
  '["React", "TypeScript", "Tailwind CSS", "Chart.js", "Stripe API", "WebSockets"]'::jsonb,
  'ApexMetrics Ltd.',
  'Canada',
  true,
  false
),
(
  'job-brand-design',
  'Complete SaaS Brand Identity, Design System & Mobile Prototypes in Figma',
  '$4,200',
  'Fixed',
  'Expert',
  'Design & Creative',
  'Posted 6h ago',
  '1 to 2 Months',
  'Looking for a world-class UI/UX product designer to create full design system components, interactive tablet & desktop prototypes, and complete iconography guidelines for enterprise rollout.',
  '["Figma", "UI/UX Design", "Design Systems", "Mobile App UI", "Prototyping"]'::jsonb,
  'KiteFlow Technologies',
  'Germany',
  true,
  false
),
(
  'job-cloud-infra',
  'Implement Terraform Infrastructure on AWS with Zero-Downtime Deployments',
  '$85/hr',
  'Hourly',
  'Expert',
  'Development & IT',
  'Posted 8h ago',
  '3 to 6 Months',
  'Setup scalable ECS Fargate cluster with automated GitHub Actions CI/CD pipelines, CloudWatch observability dashboards, and seamless blue/green deployments.',
  '["AWS", "Terraform", "Docker", "GitHub Actions", "PostgreSQL", "Kubernetes"]'::jsonb,
  'NovaCloud Systems',
  'United States',
  true,
  false
),
(
  'job-seo-growth',
  'Technical SEO Audit & Funnel Growth Strategy for B2B Marketplace',
  '$2,500',
  'Fixed',
  'Intermediate',
  'Sales & Marketing',
  'Posted 12h ago',
  '1 Month',
  'Perform full Core Web Vitals audit, content cluster indexing strategy, and optimize user acquisition funnels for international enterprise expansion.',
  '["Technical SEO", "Google Search Console", "Content Strategy", "CRO", "HubSpot"]'::jsonb,
  'HyperScale Ventures',
  'Australia',
  true,
  false
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  rate = EXCLUDED.rate,
  description = EXCLUDED.description;

-- Seed Conversations & Messages
INSERT INTO public.conversations (
  id, participant_name, participant_avatar, participant_role, last_message, last_message_time, unread_count, online
) VALUES
(
  'conv-1',
  'Alex Chen',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'Product Lead at ApexMetrics',
  'Great! Looking forward to reviewing the dashboard prototypes tomorrow.',
  '10:45 AM',
  2,
  true
),
(
  'conv-2',
  'Sarah Jenkins',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'CTO at NovaCloud',
  'Could you review the updated AWS ECS deployment manifest?',
  'Yesterday',
  0,
  false
),
(
  'conv-3',
  'Liam Thorne',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  'Creative Director at Aura Studio',
  'The master track stems sound phenomenal. Sending contract milestone payment now.',
  'Oct 24',
  0,
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.messages (conversation_id, sender, text) VALUES
('conv-1', 'client', 'Hi Elena! We saw your proposal for the billing telemetry dashboard.'),
('conv-1', 'me', 'Hi Alex, thank you! I specialize in Next.js, Stripe usage billing and real-time Chart.js visualizers.'),
('conv-1', 'client', 'Great! Looking forward to reviewing the dashboard prototypes tomorrow.')
ON CONFLICT DO NOTHING;