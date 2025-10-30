# Quick Fix Guide for CSS Not Working

## Problem
When you download the code and run it locally, only HTML shows but CSS doesn't work.

## Solution - Follow These Steps:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Install Missing Tailwind Packages
```bash
npm install -D tailwindcss@3.4.1 autoprefixer@10.4.18 tailwindcss-animate@1.0.7
```

### Step 3: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

**On Windows:**
```bash
rmdir /s /q .next
npm run dev
```

## If Still Not Working:

### Option A: Full Clean Install
```bash
# Delete node_modules and lock files
rm -rf node_modules package-lock.json
# or on Windows: rmdir /s /q node_modules && del package-lock.json

# Reinstall everything
npm install

# Clear cache and restart
rm -rf .next
npm run dev
```

### Option B: Verify File Structure
Make sure these files exist:
- ✅ `/app/layout.tsx` - Must import `./globals.css`
- ✅ `/app/globals.css` - Must have `@tailwind` directives
- ✅ `/tailwind.config.ts` - Must scan `/app` and `/components`
- ✅ `/postcss.config.js` - Must have tailwindcss plugin

### Option C: Check Import in layout.tsx
Open `/app/layout.tsx` and verify it imports the CSS:

```typescript
import "./globals.css";  // ← This line must be present
```

## Common Issues:

### Issue 1: Tailwind Not Processing
**Symptom:** Classes like `bg-blue-500` don't work  
**Fix:** Make sure `tailwind.config.ts` content array includes your files

### Issue 2: CSS Not Loaded
**Symptom:** No styles at all  
**Fix:** Check that `layout.tsx` imports `./globals.css`

### Issue 3: Module Not Found Errors
**Symptom:** Cannot find 'tailwindcss-animate'  
**Fix:** Run `npm install -D tailwindcss-animate`

### Issue 4: Old Cache
**Symptom:** Changes don't appear  
**Fix:** Delete `.next` folder and restart dev server

## Verify Installation:

After running `npm install`, check that `package.json` has:

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## Test That It Works:

1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. You should see:
   - Beautiful gradient background (blue-purple-cyan)
   - Glassmorphism panels with blur effects
   - Animated glow effects
   - Working buttons and inputs

## Still Having Issues?

Try this complete reset:

```bash
# 1. Delete everything
rm -rf node_modules package-lock.json .next

# 2. Clean npm cache
npm cache clean --force

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev
```

## Port Already in Use?

If you see "Port 3000 is already in use":

```bash
# Kill the process on port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then restart
npm run dev
```

## Success Checklist:
- [ ] `npm install` completed without errors
- [ ] `.next` folder deleted before starting
- [ ] Dev server running on http://localhost:3000
- [ ] Browser shows gradient background
- [ ] Sidebar and chat interface visible
- [ ] Buttons have proper styling
- [ ] Hover effects work

If all checkboxes are marked, your CSS is working! 🎉
