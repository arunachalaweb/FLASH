# Admin Panel Build Plan

## 1. Auth & Roles

- Enable email/password + Google sign-in (Lovable managed OAuth) on existing `/login` and `/signup`.
- Add `profiles` table (auto-created on signup: id, full_name, phone, avatar_url).
- Add `user_roles` table + `app_role` enum (`admin`, `editor`, `user`) + `has_role()` security-definer function.
- Manual grant: seed your admin email after first login (I'll ask for it before running the seed).
- New `_authenticated/admin` route subtree gated by `has_role(auth.uid(), 'admin')`; non-admins redirected to home.

## 2. Database Schema (all with RLS + GRANTs)

- **CMS — page copy**: `page_content` (page_slug, section_key, field_key, value_text, value_json) — powers hero titles, about copy, contact info, footer text.
- **Structured content**:
  - `services` (slug, title, tagline, description, icon, hero_image, benefits[], specs jsonb, order, published)
  - `projects` (title, sector, location, capacity_kw, image_url, gallery[], description, completed_on, featured)
  - `testimonials` (name, role, company, avatar_url, quote, rating, order, published)
  - `faqs` (question, answer, category, order, published)
  - `team_members` (name, role, bio, photo_url, email, order, published) — rendered on About page
- **Enquiries**:
  - `contact_enquiries` (name, email, phone, subject, message, status: new/read/replied/archived)
  - `quote_requests` (name, email, phone, service_type, property_type, load_kw, budget, city, message, status)
  - `newsletter_subscribers` (email unique, subscribed_at, active)
- Public reads: `services`, `projects`, `testimonials`, `faqs`, `team_members`, `page_content` where `published = true` (anon SELECT).
- Public inserts: 3 enquiry tables (anon INSERT, no SELECT).
- Admin: full CRUD everywhere via `has_role(auth.uid(),'admin')`.

## 3. Admin Panel UI (`/admin/*`)

Layout: shadcn `Sidebar` (collapsible, mobile drawer) + top bar with user menu + sign-out.

Routes:

- `/admin` — **Dashboard**: stat cards (new enquiries today/week, total users, total subscribers, published services/projects), recent enquiries table, mini bar chart of enquiries per day (Recharts).
- `/admin/enquiries/contact` — table, filters, detail drawer, status change, mark replied, delete.
- `/admin/enquiries/quotes` — same pattern.
- `/admin/enquiries/subscribers` — list, export CSV, deactivate.
- `/admin/cms/pages` — edit page copy (home hero, about, contact info, footer) via grouped form fields.
- `/admin/cms/services` — CRUD list + edit form (image upload to Supabase Storage).
- `/admin/cms/projects` — CRUD + gallery manager.
- `/admin/cms/testimonials` — CRUD.
- `/admin/cms/faqs` — CRUD with drag-reorder.
- `/admin/team` — CRUD for team members.
- `/admin/members` — registered site users list (from `auth.users` via admin server fn), search, promote to editor/admin, deactivate.
- `/admin/settings` — profile + password change.

Design: Solar Horizon palette, glassmorphic cards, gradient sidebar accents, fully responsive (sidebar collapses to icon rail on tablet, off-canvas drawer on mobile).

## 4. Public Site Wiring

- Contact form → inserts into `contact_enquiries`.
- Quote form → inserts into `quote_requests`.
- Newsletter → inserts into `newsletter_subscribers` (upsert on email).
- Home/About/Services/Projects pages read published content from DB (with sensible fallbacks to current hardcoded content so nothing breaks before you populate the CMS).

## 5. Server Functions

- `getDashboardStats` (admin) — counts + last 30-day series.
- `listSiteUsers` (admin, uses `supabaseAdmin` for `auth.admin.listUsers`).
- `updateUserRole`, `deactivateUser` (admin).
- CRUD server fns use `requireSupabaseAuth` + role check.

## Technical Notes

- Storage bucket `cms-media` (public read) for service/project/team images.
- All admin writes validated with Zod.
- Row-level `has_role()` policy (security-definer, no recursion).
- `attachSupabaseAuth` already registered in `src/start.ts`.

## Delivery Order

1. Migration (schema + RLS + roles + seed data from current hardcoded content).
2. Admin layout, gate, dashboard.
3. Enquiries + wire public forms.
4. CMS modules (services → projects → testimonials → faqs → team → page_content).
5. Members management.
6. Rewire public pages to read from DB.

Before I run the migration I'll ask for the admin email to seed, and confirm Google sign-in should be enabled.
