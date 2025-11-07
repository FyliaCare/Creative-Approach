# Creative Approach - Render Deployment

This project is configured for deployment on Render.

## Deployment Steps

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Render deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configuration (Auto-detected from render.yaml):**
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - Click "Create Static Site"

### Option 2: Deploy via Render Blueprint

1. Push code to GitHub (same as above)
2. In Render Dashboard, click "New +" → "Blueprint"
3. Select your repository
4. Render will use the `render.yaml` file for configuration
5. Click "Apply"

## Environment Variables

Currently, no environment variables are required. If you need to add API keys or other secrets:

1. Go to your Render service dashboard
2. Navigate to "Environment" tab
3. Add your variables as key-value pairs

## Custom Domain Setup

After deployment:

1. Go to your static site in Render
2. Click "Settings" → "Custom Domain"
3. Add your domain (e.g., `www.creativeapproach.gh`)
4. Update your DNS records as instructed by Render

## Build Configuration

The project uses Vite for building:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** Latest LTS (auto-detected)

## SPA Routing

The `render.yaml` includes rewrite rules to handle React Router:
- All routes redirect to `index.html`
- This enables client-side routing for `/services`, `/about`, `/industries`, etc.

## Security Headers

Security headers are configured in `render.yaml`:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Preview Deployments

Pull request previews are enabled. Each PR will get a unique preview URL.

## Local Testing Before Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are listed in `package.json`
- Test build locally: `npm run build`

### Routing Issues (404 on refresh)
- Verify `render.yaml` has the rewrite rule
- Check that routes are defined in `src/App.jsx`

### Assets Not Loading
- Ensure all assets are in the `public/` folder
- Check `vite.config.js` base path configuration
- Verify paths use relative imports

## Support

For Render-specific issues, check:
- [Render Documentation](https://render.com/docs)
- [Render Status](https://status.render.com/)
- [Render Community](https://community.render.com/)
