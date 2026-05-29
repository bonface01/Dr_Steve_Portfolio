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

Use the new `Images` tab in the admin dashboard to scan CMS-managed content for cover and gallery image references and remove them with one action.

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

## Core Development Workflow

> **Important:** Every edit (small or big) must be synced to the live environment immediately.

1.  **Commit & Push:** After making changes, stage all files and push to the `main` branch.
    ```bash
    git add . && git commit -m "Update: [Brief description of change]" && git push origin main
    ```
2.  **Vercel Verification:** Monitor the build on the Vercel Dashboard.
3.  **Live Audit:** Verify the changes on the production URL (especially for UI/Image updates).

## Vercel Deployment Sync

To update your live site on Vercel:
1. **Push Changes:** Ensure all local changes are committed and pushed to your main branch:
   `git push origin main`
2. **Environment Variables:** Go to the Vercel Dashboard -> Settings -> Environment Variables. Ensure `NEXT_PUBLIC_FIREBASE_API_KEY` and other variables from `.env.local` are added for the **Production** environment.
3. **Monitor Build:** Vercel will automatically detect the push and start a deployment. You can monitor the progress in the "Deployments" tab.
4. **Verify:** Once the build is "Ready", visit `/admin` on your production URL to ensure Firebase connectivity is active (it should no longer show "Demo Mode" if configured correctly).
