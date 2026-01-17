-- Portfolio Database Schema
-- Models: Project, ContactMessage, User (future auth), AnalyticsEvent (future)

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'web' | 'mobile' | 'api'
  status VARCHAR(50) NOT NULL DEFAULT 'live', -- 'live' | 'progress' | 'archived'
  url VARCHAR(500),
  repo_url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (future auth-ready)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user', -- 'admin' | 'user'
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table (future-ready)
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL, -- 'page_view' | 'project_click' | 'contact_submit'
  page_path VARCHAR(500),
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
