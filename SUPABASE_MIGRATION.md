# Firebase Storage to Supabase Storage Migration Guide

## Overview

This guide helps you migrate from Firebase Storage to Supabase Storage while keeping MongoDB as your main database.

## Changes Made

### 1. Configuration Updates

- Updated `src/interfaces/IConfig.ts` - Changed Firebase config to Supabase config
- Updated `src/config/index.ts` - Updated all environment configurations

### 2. Storage Configuration

- Updated `src/config/storage.config.ts` - Replaced Firebase Storage with Supabase client
- Updated `src/util/image.handler.ts` - Modified image upload to use Supabase
- Updated `src/util/email.handler.ts` - Modified email template fetching to use Supabase

### 3. Email Service Migration

- Migrated from SendGrid to Nodemailer for email sending
- Updated `src/util/email.handler.ts` - Replaced SendGrid with Nodemailer SMTP
- Removed SendGrid dependencies from `package.json`
- Simplified email configuration to use existing SMTP settings

## Required Environment Variables

Add these to your `.env` file:

```bash
# Supabase Configuration
LOCAL_SUPABASE_URL=your_supabase_project_url
LOCAL_SUPABASE_ANON_KEY=your_supabase_anon_key
LOCAL_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Storage bucket names (for organization)
LOCAL_APPLICATION_IMAGES_BUCKET=application_images
LOCAL_EMAIL_TEMPLATE_BUCKET=email_templates

APPLICATION_IMAGES_BUCKET=application_images
EMAIL_TEMPLATE_BUCKET=email_templates

# Email Configuration (existing SMTP settings)
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_AUTH_USER=your_email_user
EMAIL_AUTH_PASSWORD=your_email_password
```

## Installation

Install the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to Storage in your Supabase dashboard
3. Create two buckets:
   - `application-images` - for storing user images, event flyers, etc.
   - `email-templates` - for storing email templates

## Storage Bucket Policies

Set up Row Level Security (RLS) policies for your buckets:

### For `application_images` bucket:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public read access to images
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'application-images');
```

### For `email_templates` bucket:

```sql
-- Allow service role to read email templates
CREATE POLICY "Allow service role read access" ON storage.objects
FOR SELECT USING (bucket_id = 'email-templates');
```

## Migration Steps

1. **Install Supabase client**: `npm install @supabase/supabase-js`
2. **Set up Supabase project** and create storage buckets
3. **Update environment variables** with your Supabase credentials
4. **Migrate existing files** from Firebase Storage to Supabase Storage
5. **Test the application** to ensure file uploads and downloads work correctly

## File Migration

To migrate existing files from Firebase Storage to Supabase Storage:

1. Download all files from your Firebase Storage buckets
2. Upload them to the corresponding Supabase Storage buckets
3. Update any hardcoded URLs in your database or code

## Email Service Benefits

### SendGrid to Nodemailer Migration:

- **Cost savings**: No more SendGrid API costs
- **Simplified setup**: Uses existing SMTP configuration
- **Better control**: Full control over email delivery
- **Reduced dependencies**: Fewer external service dependencies

## Testing

After migration, test these features:

- User profile image uploads
- Event flyer uploads
- Email template fetching
- Image retrieval and display
- Email sending functionality

## Rollback Plan

If you need to rollback:

1. Keep the old Firebase configuration in a backup
2. Revert the code changes
3. Switch back to Firebase Storage environment variables
4. Reinstall SendGrid if needed

## Benefits of Supabase Storage

- **Better security** with Row Level Security policies
- **Unified platform** if you decide to use other Supabase features later
- **Open source** and more transparent
- **Cost effective** for small to medium projects
- **Real-time capabilities** available if needed in the future
