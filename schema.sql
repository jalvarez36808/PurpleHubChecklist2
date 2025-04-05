-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table to store user information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Onboarding responses table to store questionnaire answers
CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_key VARCHAR(100) NOT NULL,
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_key)
);

-- Categories for organizing tasks
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    display_order INTEGER
);

-- Tasks table for the checklist items
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_time VARCHAR(50),
    importance_level VARCHAR(20),
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User tasks progress tracking
CREATE TABLE user_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id VARCHAR(255) REFERENCES tasks(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, task_id)
);

-- Resources library
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL,
    url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User documents storage
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(512) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Task dependencies (for tasks that require other tasks to be completed first)
CREATE TABLE task_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    dependent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT task_dependency_unique UNIQUE(task_id, dependent_task_id),
    CONSTRAINT task_not_self_dependent CHECK (task_id != dependent_task_id)
);

-- Recreate the obituary_templates table
DROP TABLE IF EXISTS obituary_templates;
CREATE TABLE obituary_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Draft',
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_obituary_templates_user_id ON obituary_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_obituary_templates_updated_at ON obituary_templates(updated_at DESC);

-- Enable RLS
ALTER TABLE obituary_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own templates" ON obituary_templates;
DROP POLICY IF EXISTS "Users can insert their own templates" ON obituary_templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON obituary_templates;
DROP POLICY IF EXISTS "Users can delete their own templates" ON obituary_templates;

-- Create RLS policies
CREATE POLICY "Users can view their own templates"
    ON obituary_templates FOR SELECT
    USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own templates"
    ON obituary_templates FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own templates"
    ON obituary_templates FOR UPDATE
    USING (auth.uid()::text = user_id::text)
    WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own templates"
    ON obituary_templates FOR DELETE
    USING (auth.uid()::text = user_id::text);

-- Create indexes for better query performance
CREATE INDEX idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_task_id ON user_tasks(task_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_resources_category_id ON resources(category_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);

-- Add some basic categories
INSERT INTO categories (name, description, display_order) VALUES
    ('Funeral Arrangements', 'Tasks related to planning and organizing the funeral service', 1),
    ('Financial Help', 'Financial assistance and management tasks', 2),
    ('Emotional Support', 'Resources and tasks for emotional well-being', 3),
    ('Death Certificate', 'Steps for obtaining and managing death certificates', 4),
    ('Notifications', 'People and organizations to notify', 5);

-- Update the unique constraint
DROP INDEX IF EXISTS user_tasks_user_id_task_id_key;
ALTER TABLE user_tasks ADD CONSTRAINT user_tasks_user_id_task_id_key UNIQUE (user_id, task_id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_tasks_task_id ON user_tasks(task_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id_status ON user_tasks(user_id, status);

-- Enable RLS on user_tasks table
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for user_tasks
CREATE POLICY "Users can view their own tasks"
  ON user_tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON user_tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON user_tasks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON user_tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Remove the foreign key constraint on task_id since we're using string IDs
ALTER TABLE user_tasks
  DROP CONSTRAINT IF EXISTS user_tasks_task_id_fkey;

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, last_login)
  VALUES (new.id, new.email, new.created_at, new.created_at)
  ON CONFLICT (id) DO UPDATE
  SET last_login = EXCLUDED.last_login;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically insert new users
DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sync existing auth users if any
INSERT INTO public.users (id, email, created_at, last_login)
SELECT id, email, created_at, last_confirmed_at
FROM auth.users
ON CONFLICT (id) DO UPDATE
SET last_login = EXCLUDED.last_login; 