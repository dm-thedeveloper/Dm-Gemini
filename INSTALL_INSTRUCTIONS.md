# 🚀 DM-Gemini Installation Instructions

## Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

## Step-by-Step Installation

### 1️⃣ Download or Clone the Project
```bash
# If using git
git clone <your-repo-url>
cd dm-gemini

# Or download and extract the ZIP file, then navigate to the folder
```

### 2️⃣ Install Dependencies
```bash
npm install
```

**Important:** This will install all required packages including:
- Next.js 15
- React 18
- Tailwind CSS 3.4.1
- All UI components

### 3️⃣ Clear Any Existing Cache
```bash
# Mac/Linux
rm -rf .next

# Windows (Command Prompt)
rmdir /s /q .next

# Windows (PowerShell)
Remove-Item -Recurse -Force .next
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```

### 5️⃣ Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the **DM-Gemini** interface with:
- ✨ Beautiful blue-purple-cyan gradient background
- 🎨 Glassmorphism UI panels
- 💬 Chat sidebar and main area
- ⚡ Smooth animations

---

## 🐛 Troubleshooting

### Problem: CSS Not Loading (Blank White Page)

**Solution 1: Reinstall Dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Solution 2: Verify Tailwind Installation**
```bash
npm install -D tailwindcss@3.4.1 autoprefixer@10.4.18 tailwindcss-animate@1.0.7 postcss@8
npm run dev
```

**Solution 3: Clear Everything**
```bash
# Delete cache and dependencies
rm -rf .next node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall and restart
npm install
npm run dev
```

### Problem: Port 3000 Already in Use

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Windows:**
```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F

# Restart
npm run dev
```

**Or use a different port:**
```bash
npm run dev -- -p 3001
```

### Problem: Module Not Found Errors

**If you see errors like:**
- `Cannot find module 'tailwindcss-animate'`
- `Cannot find module 'autoprefixer'`

**Fix:**
```bash
npm install -D tailwindcss-animate autoprefixer
```

### Problem: TypeScript Errors

**Fix:**
```bash
npm install --save-dev @types/node @types/react @types/react-dom typescript
```

---

## 📦 Build for Production

### Build the App
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The production build will be optimized and ready to deploy.

---

## 🌐 Deployment Options

### Deploy to Vercel (Recommended - Free)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Done! Vercel automatically configures everything.

### Deploy to Netlify
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import existing project"
4. Connect to your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### Deploy to Other Platforms
- **Railway:** Supports Next.js out of the box
- **Render:** Supports Next.js applications
- **AWS Amplify:** Full Next.js support
- **DigitalOcean App Platform:** Supports Node.js/Next.js

---

## 📁 Project Structure

```
dm-gemini/
├── app/
│   ├── layout.tsx          # Root layout (imports CSS)
│   ├── page.tsx            # Main chat page
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Header.tsx          # Top header component
│   ├── ChatSidebar.tsx     # Left sidebar
│   ├── ChatArea.tsx        # Chat messages display
│   ├── InputBar.tsx        # Message input
│   └── ui/                 # Shadcn UI components
├── lib/
│   └── utils.ts            # Utility functions
├── tailwind.config.ts      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

---

## 🔧 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## ✅ Verification Checklist

After installation, verify these work:

- [ ] Gradient background is visible (blue-purple-cyan)
- [ ] Header shows "DM-Gemini" logo
- [ ] Left sidebar shows chat history
- [ ] "New Chat" button is styled correctly
- [ ] Input bar at bottom is visible
- [ ] Hover effects work on buttons
- [ ] Chat messages have glassmorphism effect
- [ ] Animated glow effects in background
- [ ] Responsive layout adapts to window size

---

## 🆘 Still Having Issues?

### Check These Files:

**1. `/app/layout.tsx` - Must import CSS:**
```typescript
import "./globals.css";  // ← This line is critical
```

**2. `/app/globals.css` - Must have Tailwind directives:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**3. `/tailwind.config.ts` - Must scan your files:**
```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
```

### Get Help:
- Check the `QUICK_FIX.md` file for common solutions
- Review `NEXTJS_STRUCTURE.md` for architecture details
- See `README.md` for project overview

---

## 🎉 Success!

If you see the beautiful DM-Gemini interface with the gradient background and glassmorphism panels, congratulations! Your installation is complete.

Enjoy building with DM-Gemini! ✨
