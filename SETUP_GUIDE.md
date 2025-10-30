# DM-Gemini Setup Guide

Complete guide to set up and run the DM-Gemini Next.js application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.17 or later ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn** or **pnpm**

Check your versions:
```bash
node --version  # Should be v18.17 or higher
npm --version   # Should be v9 or higher
```

## 🚀 Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

Or pnpm:
```bash
pnpm install
```

This will install all required packages including:
- Next.js 15
- React 18
- Tailwind CSS 3
- Lucide React (icons)
- Radix UI components
- TypeScript

### Step 2: Verify Installation

After installation completes, you should see a `node_modules` folder in your project directory.

### Step 3: Run Development Server

Start the development server:

```bash
npm run dev
```

Or:
```bash
yarn dev
# or
pnpm dev
```

### Step 4: Open in Browser

Once the server starts, you'll see a message like:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

You should now see the DM-Gemini interface with:
- ✅ Gradient background (blue-purple-cyan)
- ✅ Glassmorphism panels
- ✅ Header with logo
- ✅ Chat sidebar
- ✅ Message input field

## 🛠️ Troubleshooting

### Problem: CSS Not Loading

**Symptoms:** Page shows HTML structure but no colors, gradients, or styling.

**Solution:**

1. **Delete `.next` folder and node_modules:**
   ```bash
   rm -rf .next node_modules
   # On Windows use: rmdir /s .next node_modules
   ```

2. **Reinstall dependencies:**
   ```bash
   npm install
   ```

3. **Clear cache and restart:**
   ```bash
   npm run dev
   ```

### Problem: Module Not Found Errors

**Solution:**
```bash
npm install lucide-react @radix-ui/react-scroll-area @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

### Problem: TypeScript Errors

**Solution:**
```bash
npm install --save-dev @types/node @types/react @types/react-dom typescript
```

### Problem: Port 3000 Already in Use

**Solution:**
Run on a different port:
```bash
npm run dev -- -p 3001
```

Then open `http://localhost:3001`

## 📁 Key Files

Make sure these files exist:

- ✅ `/app/layout.tsx` - Root layout
- ✅ `/app/page.tsx` - Main page
- ✅ `/app/globals.css` - **CRITICAL:** Tailwind CSS imports
- ✅ `/tailwind.config.ts` - Tailwind configuration
- ✅ `/postcss.config.js` - PostCSS configuration
- ✅ `/next.config.js` - Next.js configuration
- ✅ `/tsconfig.json` - TypeScript configuration
- ✅ `/package.json` - Dependencies

## 🔍 Verify CSS is Working

Open browser DevTools (F12) and check:

1. **Network Tab:** Look for `globals.css` - it should load successfully (200 status)
2. **Elements Tab:** Inspect any element - you should see Tailwind classes applied
3. **Background:** The page background should be a gradient (blue → purple → cyan)

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`

## 📞 Need Help?

If you're still having issues:

1. **Check Node version:** `node --version` (must be 18.17+)
2. **Clear all caches:**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run dev
   ```
3. **Verify all files exist** (check file structure above)
4. **Check browser console** for JavaScript errors (F12 → Console tab)

## ✅ Success Checklist

- [ ] Node.js 18.17+ installed
- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:3000` loads in browser
- [ ] Page shows gradient background (blue-purple-cyan)
- [ ] Glassmorphism panels are visible
- [ ] Header with "DM-Gemini" logo appears
- [ ] Chat sidebar on the left is visible
- [ ] Input field at the bottom works
- [ ] You can type and send messages

If all items are checked ✅, your installation is successful!

## 🎨 Customization

Once everything works, you can customize:

- **Colors:** Edit `/app/globals.css` and component files
- **Layout:** Modify components in `/components/`
- **Styling:** Update Tailwind classes in component files

Happy coding! 🚀
