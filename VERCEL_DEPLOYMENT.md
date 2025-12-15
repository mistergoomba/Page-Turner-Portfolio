# Vercel Deployment Guide

## Key Differences from Next.js

This is an **Express + Vite** app, not Next.js. Here's what's different:

### Next.js
- Framework handles routing automatically
- Built-in API routes (`/api/*`)
- Automatic static optimization
- `next build` creates optimized output

### This Setup
- **Express server** serves both API and static files
- **Vite** builds the frontend to `dist/public`
- **esbuild** bundles the server to `dist/index.cjs`
- Server runs on a single port (default 3000)

## Deployment Options

### Option 1: Vercel (Serverless Functions) ✅ Recommended

**Pros:**
- Free tier available
- Automatic HTTPS
- Global CDN
- Easy Git integration

**Cons:**
- Need to adapt Express app for serverless
- WebSockets not supported (if you need them)
- 10-second timeout on free tier

**Setup Steps:**

1. **Created `vercel.json`** - Configured build and routing
2. **Created `api/index.ts`** - Vercel serverless function adapter

3. **In Vercel Dashboard:**
   - Connect your GitHub repo
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. **Environment Variables:**
   - Set `NODE_ENV=production` in Vercel dashboard
   - Add any other env vars your app needs (database, API keys, etc.)

5. **Important Notes:**
   - The `api/index.ts` file wraps your Express app for Vercel's serverless functions
   - All routes are rewritten to `/api/index` which handles everything
   - Static files are served from `dist/public` after build

### Option 2: Railway / Render / Fly.io

**Pros:**
- Full Express server support
- WebSocket support
- More like traditional hosting

**Setup:**
- Deploy as a Node.js app
- Set start command: `npm start`
- Set build command: `npm run build`
- Set PORT environment variable (they'll provide it)

### Option 3: Netlify

Similar to Vercel but uses `netlify.toml` instead of `vercel.json`

## Build Process

When you run `npm run build`:
1. **Vite** builds React app → `dist/public/`
2. **esbuild** bundles Express server → `dist/index.cjs`
3. Server serves static files from `dist/public` in production

## Troubleshooting

### Issue: Routes not working
- Check `vercel.json` rewrites configuration
- Ensure `api/index.ts` exports the handler correctly

### Issue: Static files not loading
- Verify build outputs to `dist/public`
- Check `server/static.ts` path resolution

### Issue: Environment variables
- Add them in Vercel dashboard under Settings → Environment Variables
- Redeploy after adding

### Issue: Build fails
- Check Node.js version (Vercel uses Node 20.x by default)
- Ensure all dependencies are in `package.json` (not just devDependencies for production)

## Current Configuration

- ✅ `vercel.json` - Vercel configuration
- ✅ `api/index.ts` - Serverless function adapter
- ⚠️ May need to adjust `server/static.ts` for ES modules (`__dirname` issue)

## Next Steps

1. Test locally: `npm run build && npm start`
2. Push to GitHub
3. Connect repo to Vercel
4. Deploy!

