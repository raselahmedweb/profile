-- Seed the required project data

INSERT INTO projects (slug, title, description, type, status, url, repo_url, tags, featured, display_order)
VALUES
  (
    'addabd',
    'AddaBD',
    'A Facebook-inspired social platform allowing users to connect. Includes an AI-powered image generator and a smart assistant for enhanced user interactions.',
    'web',
    'live',
    'https://addabd.vercel.app',
    NULL,
    ARRAY['Next.js', 'React', 'AI', 'Social Platform', 'Vercel AI'],
    true,
    1
  ),
  (
    'map-crm',
    'MAP CRM',
    'A dynamic MAP CRM built with React, TypeScript, and Node.js. Features cost calculation, employee task management, and map-based device installation zones for Camera, Speaker, and Telephone systems.',
    'web',
    'live',
    'https://map-crm-dashboard.vercel.app/',
    NULL,
    ARRAY['React', 'TypeScript', 'Node.js', 'CRM', 'Maps'],
    true,
    2
  ),
  (
    'e-shop-app',
    'E-Shop App',
    'A modern React Native e-commerce application featuring banners, flash sales, category browsing, and a clean, intuitive UI. Available on Android (APK) and iOS (via Expo).',
    'mobile',
    'live',
    NULL,
    'https://github.com/raselahmedweb/client-shop',
    ARRAY['React Native', 'Expo', 'E-commerce', 'Mobile', 'TypeScript'],
    true,
    3
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  type = EXCLUDED.type,
  status = EXCLUDED.status,
  url = EXCLUDED.url,
  repo_url = EXCLUDED.repo_url,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();
