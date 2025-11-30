This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Multi-Tenant Plugin System

This application uses a plugin-based architecture to support multiple tenants with different meal libraries, categories, and branding. Each tenant's configuration is encapsulated in a plugin that can be dynamically loaded at runtime.

### Available Plugins

- **default**: The original Boring Meal Planner configuration
- **veggie**: A vegetarian-focused meal planner with plant-based meals

### Tenant Resolution

The application supports multiple ways to specify which tenant configuration to load:

#### 1. URL Query Parameter (Highest Priority)

Add a `tenant` query parameter to the URL:

```
http://localhost:3000?tenant=veggie
http://localhost:3000?tenant=default
```

#### 2. Environment Variable

Set the `NEXT_PUBLIC_TENANT_ID` environment variable:

```bash
# In your .env.local file
NEXT_PUBLIC_TENANT_ID=veggie

# Or when running the development server
NEXT_PUBLIC_TENANT_ID=veggie npm run dev
```

#### 3. Subdomain Detection

The system can detect tenant from subdomain (e.g., `veggie.example.com` would load the veggie plugin).

#### 4. Default Fallback

If no tenant is specified or the specified tenant doesn't exist, the application falls back to the `default` plugin.

### Resolution Priority

When multiple resolution methods are available, they are evaluated in this order:

1. URL query parameter (`?tenant=`)
2. Subdomain detection
3. Environment variable (`NEXT_PUBLIC_TENANT_ID`)
4. Default fallback

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
