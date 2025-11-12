# Chatbot Frontend

Angular 17 standalone application with AI chatbot integration and multiple personality modes.

## Features

- 🎨 Modern Angular 17 with standalone components
- 🎭 6 personality modes selector
- 💬 Real-time chat interface
- 📱 Fully responsive design
- 🌈 Beautiful gradient UI
- ⚡ Fast and lightweight

## Prerequisites

- Node.js v22.19.0 or higher
- npm or yarn
- Angular CLI (optional)

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure backend URL**:

By default, the app connects to `http://localhost:3002/api/chat`.

To use a production backend, update `src/app/chat/chat.component.ts`:

```typescript
// Find this line in sendMessage():
const apiUrl = 'http://localhost:3002/api/chat';

// Change to your deployed backend URL:
const apiUrl = 'https://your-backend.onrender.com/api/chat';
```

## Running Locally

```bash
# Development server
npm start

# Or with Angular CLI
ng serve
```

Navigate to `http://localhost:4200` in your browser.

## Building for Production

```bash
# Build the app
npm run build

# Output will be in dist/frontend/browser/
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── chat/
│   │   │   ├── chat.component.ts      # Main chat logic
│   │   │   ├── chat.component.html    # Chat UI template
│   │   │   └── chat.component.css     # Chat styling
│   │   └── app.component.ts           # Root component
│   ├── styles.css                     # Global styles
│   ├── index.html                     # HTML entry point
│   └── main.ts                        # Bootstrap file
├── angular.json                       # Angular configuration
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── README.md                          # This file
```

## Personality Modes

The chatbot supports 6 different personalities:

1. **Polite** - Formal and respectful assistant
2. **Friendly** - Casual and warm companion
3. **Energetic** - Enthusiastic and upbeat!
4. **Mirror My Energy** - Matches your communication style
5. **Sarcastic** - Witty with dry humor
6. **Professional** - Business-focused and concise

Switch personalities using the dropdown in the chat header.

## Deployment

### Option 1: Netlify (Recommended)

1. **Build the app**:
```bash
npm run build
```

2. **Deploy to Netlify**:
   - Go to https://app.netlify.com
   - Drag and drop the `dist/frontend/browser/` folder
   - Or connect your GitHub repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist/frontend/browser`

### Option 2: Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Follow prompts** to link your project

### Option 3: GitHub Pages

1. **Install angular-cli-ghpages**:
```bash
npm install -g angular-cli-ghpages
```

2. **Build and deploy**:
```bash
ng build --base-href "https://username.github.io/repo-name/"
npx angular-cli-ghpages --dir=dist/frontend/browser
```

### Option 4: Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**:
```bash
firebase init hosting
```

3. **Deploy**:
```bash
npm run build
firebase deploy
```

## Configuration

### Environment Variables

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
  apiUrl: 'https://your-backend.onrender.com/api/chat'
};
```

### Update Component to Use Environment

In `chat.component.ts`:
```typescript
import { environment } from '../../environments/environment';

// In sendMessage():
const apiUrl = environment.apiUrl;
```

## Connecting to Backend

Ensure your backend:
1. Is running and accessible
2. Has CORS configured to allow your frontend domain
3. Accepts POST requests to `/api/chat`

### CORS Configuration

Your backend must allow your frontend URL. Update backend `server.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:4200',
    'https://your-frontend.netlify.app'  // Add your deployed URL
  ],
  credentials: true
};
```

## Troubleshooting

### Cannot Connect to Backend
- Verify backend is running
- Check backend URL in `chat.component.ts`
- Ensure CORS is configured in backend
- Check browser console for errors

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Ensure you're using TypeScript 5.2+ and `moduleResolution: "bundler"` in `tsconfig.json`.

## Development Tips

### Hot Reload
The dev server automatically reloads on file changes.

### Angular DevTools
Install the Angular DevTools browser extension for debugging:
- [Chrome](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/angular-devtools/)

### Debugging
Open browser DevTools (F12) to see:
- Network requests to backend
- Console errors/logs
- Component inspection with Angular DevTools

## Customization

### Change Colors
Edit `src/styles.css`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modify Chat Styling
Edit `src/app/chat/chat.component.css` to customize:
- Chat bubble colors
- Layout spacing
- Button styles
- Animations

### Add New Personalities
1. Update backend `server.js` PERSONALITIES object
2. Update frontend `chat.component.ts` personalities array
3. Add descriptions in the dropdown

## Performance

- Built with Angular's production mode for optimal performance
- Lazy loading ready
- Minimal bundle size with standalone components
- Tree-shaking enabled

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See root project for details.

## Related Documentation

- [Backend API Server](../chatbot-api-server/README.md)
- [Main Documentation](../DOCUMENTATION.md)

## Support

For issues or questions, please refer to the main documentation or create an issue in the repository.
