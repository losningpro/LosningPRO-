# Architecture Decisions - LøsningPRO Multi-Tenant SaaS

## Supabase Usage Scope

### Database & Authentication
- **Database**: Supabase PostgreSQL for all tenant data, marketplace, leads, orders, users, and gallery
- **Authentication**: Supabase Auth for admin/staff/tenant login (RBAC enforcement)
- **Row Level Security (RLS)**: Enforced for strict tenant isolation
- **Real-time subscriptions**: Optional for admin dashboard live updates

### NOT Using Supabase For
- **Edge Functions**: Backend API will be custom Node.js/Express or similar
- **Hosting**: Frontend hosted separately (Vercel/Netlify/custom)
- **Storage**: Will use Supabase Storage for images (product, gallery, lead uploads)

### Rationale
1. **Database**: Supabase provides excellent PostgreSQL with built-in RLS for tenant isolation
2. **Auth**: Supabase Auth integrates seamlessly with database RLS policies
3. **Storage**: Supabase Storage provides CDN-backed file hosting with access control
4. **Backend API**: Custom backend allows full control over Stripe webhooks, AI integrations, and business logic
5. **Frontend Hosting**: Separate hosting enables better performance optimization and CDN distribution

### Integration Points
- Frontend → Supabase (direct for public marketplace queries, auth)
- Frontend → Custom Backend API (checkout, lead creation, admin operations)
- Backend API → Supabase (server-side queries with service role key)
- Backend API → Stripe (payment processing)
- Backend API → AI Services (lead scoring, vision analysis)

### Environment Variables Required
```
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx... (backend only)

# Stripe
STRIPE_PUBLIC_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx (backend only)
STRIPE_WEBHOOK_SECRET=whsec_xxx (backend only)

# SMTP
SMTP_HOST=smtp.simply.com
SMTP_PORT=587
SMTP_USER=no-reply@losningpro.dk
SMTP_PASS=xxx
DEFAULT_FROM_EMAIL=no-reply@losningpro.dk

# AI
OPENAI_API_KEY=sk-xxx (backend only)

# App
NODE_ENV=production
FRONTEND_URL=https://losningpro.dk
BACKEND_URL=https://api.losningpro.dk
```

### Database Schema (Supabase)
All tables include RLS policies filtering by tenant_id.

### File Storage Structure (Supabase Storage)
```
buckets/
  marketplace-images/
    {tenant_id}/{product_id}/{filename}
  gallery-images/
    {tenant_id}/{gallery_id}/{filename}
  lead-images/
    {tenant_id}/{lead_id}/{filename}
```

### Decision: Hybrid Architecture
- **Supabase**: Database + Auth + Storage
- **Custom Backend**: Business logic + Stripe + AI + Email
- **Frontend**: React SPA with direct Supabase queries for public data

This approach maximizes Supabase strengths while maintaining full control over critical business operations.