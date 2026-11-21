This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Admin authentication

The admin area uses Truecaller Mobile Web sign-in, which is currently supported only in Android browsers. Set these server environment variables locally and in Vercel:

- `TRUECALLER_APP_KEY`: the Web app key from the Truecaller developer portal.
- `TRUECALLER_ADMIN_PHONE`: the one authorized admin number, including country code (digits only).
- `TRUECALLER_APP_NAME`: the name shown in the Truecaller consent prompt (optional; defaults to `RAYVOID`).
- `SECRET_KEY`: a long, random signing key used for admin sessions and temporary token encryption.

Register `https://rayvoid.vercel.app/api/auth/truecaller/callback` as the Truecaller app's HTTPS callback URL. Apply `db/migrations/001-admin-auth-attempts.sql` to the MySQL database before enabling sign-in. Keep `SECRET_KEY` and `TRUECALLER_ADMIN_PHONE` server-only; do not prefix them with `NEXT_PUBLIC_`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
