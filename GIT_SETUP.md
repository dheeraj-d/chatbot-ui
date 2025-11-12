# Setup Frontend Repository

This guide will help you create a separate GitHub repository for the Angular frontend.

## Step 1: Navigate to Frontend Directory

```powershell
cd "C:\Users\dheer\projects\angular\Chatbot integration\frontend"
```

## Step 2: Create .gitignore

```powershell
@"
# Dependencies
node_modules/

# Build outputs
dist/
.angular/
build/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Environment
.env
.env.local
.env.*.local

# Misc
*.orig
.tmp/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

## Step 3: Initialize Git

```powershell
git init
```

## Step 4: Stage and Commit Files

```powershell
git add .
git commit -m "Initial commit: Angular chatbot frontend with multiple personalities"
```

## Step 5: Create GitHub Repository

### Option A: Using GitHub CLI (Easiest)

```powershell
# Public repository
gh repo create chatbot-frontend --public --source=. --remote=origin --push --description "Angular 17 chatbot frontend with AI personality modes"

# OR Private repository
gh repo create chatbot-frontend --private --source=. --remote=origin --push --description "Angular 17 chatbot frontend with AI personality modes"
```

### Option B: Manual Setup

1. Go to https://github.com/new
2. Repository name: `chatbot-frontend`
3. Description: "Angular 17 chatbot frontend with AI personality modes"
4. Choose Public or Private
5. **DO NOT** initialize with README
6. Click "Create repository"

7. Then run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/chatbot-frontend.git
git branch -M main
git push -u origin main
```

## Step 6: Update Backend URL

Before deploying, update `src/app/chat/chat.component.ts` with your backend URL:

```typescript
// Find this line in sendMessage():
const apiUrl = 'http://localhost:3002/api/chat';

// Change to your deployed backend:
const apiUrl = 'https://chatbot-api-server-xxxx.onrender.com/api/chat';
```

**Better approach - Use environment files:**

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3002/api/chat'
};
```

Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://chatbot-api-server-xxxx.onrender.com/api/chat'
};
```

Then update `chat.component.ts`:
```typescript
import { environment } from '../../environments/environment';

// In sendMessage():
const apiUrl = environment.apiUrl;
```

## Step 7: Deploy to Netlify

### Option A: Drag and Drop

1. Build locally:
```powershell
npm run build
```

2. Go to https://app.netlify.com
3. Drag `dist/frontend/browser/` folder to Netlify
4. Done! Your site is live

### Option B: Continuous Deployment (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub
4. Select `chatbot-frontend` repository
5. Configure:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/frontend/browser`
6. Click "Deploy site"

## Step 8: Update Backend CORS

After deploying, update your backend's `ALLOWED_ORIGINS` environment variable in Render:

```
ALLOWED_ORIGINS=https://your-frontend.netlify.app,http://localhost:4200
```

## Alternative: Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

Configure in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/frontend/browser",
  "framework": "angular"
}
```

## Alternative: Deploy to GitHub Pages

```powershell
# Install angular-cli-ghpages
npm install -g angular-cli-ghpages

# Build with base href
npm run build -- --base-href "https://YOUR_USERNAME.github.io/chatbot-frontend/"

# Deploy
npx angular-cli-ghpages --dir=dist/frontend/browser
```

## Repository Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── chat/
│   │   │   ├── chat.component.ts
│   │   │   ├── chat.component.html
│   │   │   └── chat.component.css
│   │   └── app.component.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Quick Commands

```powershell
# Check status
git status

# Pull latest
git pull origin main

# Make changes and push
git add .
git commit -m "Your commit message"
git push origin main

# Build for production
npm run build

# Test locally
npm start
```

## Add Repository Badges (Optional)

Update README.md:

```markdown
# Chatbot Frontend

![Angular](https://img.shields.io/badge/angular-17-red)
![TypeScript](https://img.shields.io/badge/typescript-5.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Netlify](https://img.shields.io/netlify/YOUR_SITE_ID)

[Live Demo](https://your-frontend.netlify.app)
```

## Environment Variables in Netlify

If you want to use build-time environment variables:

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add:
   - `API_URL`: `https://chatbot-api-server-xxxx.onrender.com/api/chat`

3. Update build command in Netlify:
```
npm run build -- --configuration=production
```

## Testing the Deployment

After deployment:

1. **Check frontend loads**: Visit your Netlify URL
2. **Test chat functionality**: Send a message
3. **Test all personalities**: Switch between modes
4. **Check mobile responsiveness**: Test on phone

If chat doesn't work:
- Check browser console for CORS errors
- Verify backend URL is correct
- Ensure backend CORS allows your frontend URL

## Troubleshooting

### Build fails on Netlify
- Check Node version: Netlify uses Node 18 by default
- Add `.nvmrc` file with `22` if needed
- Check build logs for specific errors

### Chat not working
- Open browser DevTools (F12)
- Check Network tab for failed requests
- Verify backend URL in code
- Check CORS configuration in backend

### CORS error
- Update backend `ALLOWED_ORIGINS` environment variable
- Include your exact Netlify URL (with https://)
- Redeploy backend after updating

## Next Steps

1. ✅ Create frontend repository (you're here!)
2. ⬜ Update backend URL in code
3. ⬜ Deploy to Netlify/Vercel
4. ⬜ Update backend CORS settings
5. ⬜ Test deployment

---

**Frontend Repository Created!** 🎉

Repository URL: `https://github.com/YOUR_USERNAME/chatbot-frontend`
Deploy URL: `https://your-frontend.netlify.app`
