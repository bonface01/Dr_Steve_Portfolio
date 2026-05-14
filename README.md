# Steve Muthusi, PhD Portfolio

Premium personal brand, academic portfolio, psychology leadership website, CMS-style blog, events, gallery, and admin dashboard.

## Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Firebase Auth, Firestore, and Storage
- Vercel-ready deployment

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin

Visit `/admin`.

Without Firebase env vars, the dashboard runs in demo mode:

- Email: `admin@pdc.local`
- Password: `steve-admin-demo`

With Firebase configured, create an email/password admin user in Firebase Auth and use those credentials.

## Firebase Setup

1. Create a Firebase project.
2. Enable Firestore, Authentication email/password, and Storage.
3. Copy `.env.example` to `.env.local`.
4. Fill in the public Firebase client variables.
5. Add Firebase Admin service account values for API routes, contact submissions, and seeding.
6. Seed Firestore:

```bash
npm run seed
```

## Production Checklist

- Set `NEXT_PUBLIC_SITE_URL` to the deployed domain in Vercel.
- Set all `NEXT_PUBLIC_FIREBASE_*` variables in Vercel.
- Set `NEXT_PUBLIC_ENABLE_DEMO_ADMIN=false` in production.
- Set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` for server-side Firestore/API access.
- Create a real Firebase Authentication admin user.
- Configure Firestore and Storage security rules before accepting live content.

## Deployment

Deploy the frontend to Vercel.

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add the same environment variables from `.env.example`.
4. Build command: `npm run build`.
5. Output is handled automatically by Next.js.

## Content Model

See `docs/database-schema.md` for Firestore collections and Storage folders.
