# Next.js App Structure - DM-Gemini

This document outlines the complete Next.js folder structure for the DM-Gemini AI assistant application.

## 📁 Folder Structure

\`\`\`
dm-gemini/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx                # Root layout with metadata & HTML structure
│   ├── page.tsx                  # Home page (main chat interface)
│   └── globals.css               # Global styles and Tailwind configuration
│
├── components/                   # React components
│   ├── Header.tsx                # Top header with DM-Gemini logo
│   ├── ChatSidebar.tsx           # Left sidebar with chat history
│   ├── ChatArea.tsx              # Main chat display area
│   ├── InputBar.tsx              # Bottom input field with send button
│   │
│   ├── figma/                    # Figma-specific components
│   │   └── ImageWithFallback.tsx # Protected image component
│   │
│   └── ui/                       # Shadcn UI components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx            # Used in ChatSidebar & InputBar
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx       # Used in ChatSidebar & ChatArea
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx          # Used in InputBar
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.ts         # Mobile detection hook
│       └── utils.ts              # UI utility functions
│
├── lib/                          # Utility libraries
│   └── utils.ts                  # cn() function for className merging
│
├── guidelines/                   # Documentation
│   └── Guidelines.md             # Project guidelines
│
├── public/                       # Static assets (create if needed)
│   ├── favicon.ico
│   └── images/
│
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation

\`\`\`

## 🗂️ File Purposes

### Core Next.js Files

| File | Purpose |
|------|---------|
| \`app/layout.tsx\` | Root layout component that wraps all pages, contains metadata and HTML structure |
| \`app/page.tsx\` | Main home page component - the DM-Gemini chat interface |
| \`app/globals.css\` | Global CSS with Tailwind directives, custom properties, and design tokens |

### Component Files

| File | Purpose |
|------|---------|
| \`components/Header.tsx\` | Top navigation header with logo and branding |
| \`components/ChatSidebar.tsx\` | Left sidebar showing chat history and "New Chat" button |
| \`components/ChatArea.tsx\` | Main content area displaying chat messages |
| \`components/InputBar.tsx\` | Bottom input field for user messages |

### Configuration Files

| File | Purpose |
|------|---------|
| \`next.config.js\` | Next.js framework configuration |
| \`tsconfig.json\` | TypeScript compiler configuration with path aliases |
| \`package.json\` | NPM dependencies, scripts, and project metadata |
| \`.gitignore\` | Files and folders to exclude from Git |

### Utility Files

| File | Purpose |
|------|---------|
| \`lib/utils.ts\` | Common utility functions (cn for className merging) |
| \`components/ui/utils.ts\` | UI-specific utility functions |

## 📦 Key Dependencies

### Production Dependencies
- \`next\` - Next.js framework (v15+)
- \`react\` & \`react-dom\` - React library (v18+)
- \`lucide-react\` - Icon library
- \`@radix-ui/*\` - Headless UI components
- \`tailwindcss\` - Utility-first CSS framework (v4)
- \`class-variance-authority\` - Component variants
- \`clsx\` & \`tailwind-merge\` - Conditional className utilities

### Dev Dependencies
- \`typescript\` - TypeScript language
- \`@types/*\` - Type definitions
- \`eslint\` - Code linting
- \`postcss\` - CSS processing

## 🚀 NPM Scripts

\`\`\`json
{
  "dev": "next dev",          // Start development server
  "build": "next build",      // Build for production
  "start": "next start",      // Start production server
  "lint": "next lint"         // Run ESLint
}
\`\`\`

## 🎨 Import Aliases

The project uses the \`@/*\` alias for cleaner imports:

\`\`\`typescript
// Instead of: import { Button } from "../../components/ui/button"
import { Button } from "@/components/ui/button"

// Instead of: import { cn } from "../../lib/utils"
import { cn } from "@/lib/utils"
\`\`\`

## 🔄 Migration from React to Next.js

### Key Changes Made:

1. **App Router Structure**
   - Moved \`App.tsx\` → \`app/page.tsx\`
   - Created \`app/layout.tsx\` for root layout
   - Moved \`styles/globals.css\` → \`app/globals.css\`

2. **Client Components**
   - Added \`"use client"\` directive to all interactive components
   - Components with hooks or event handlers need this directive

3. **Import Paths**
   - Updated relative imports to use \`@/\` alias
   - Example: \`"./ui/button"\` → \`"@/components/ui/button"\`

4. **Configuration**
   - Added \`tsconfig.json\` with path mappings
   - Added \`next.config.js\` for Next.js settings
   - Updated \`package.json\` with Next.js scripts

## 📝 Notes

- All components in \`/components\` use the \`"use client"\` directive since they contain interactivity
- The \`/components/figma\` folder contains protected Figma-specific components
- The \`/components/ui\` folder contains Shadcn UI components (do not modify structure)
- The app uses Tailwind CSS v4 (no \`tailwind.config.js\` needed)
- Design tokens are defined in \`app/globals.css\` using CSS custom properties

## 🌐 Deployment

This Next.js app is ready to deploy to:
- **Vercel** (recommended - zero config)
- **Netlify**
- **AWS Amplify**
- **Docker** (self-hosted)
- Any platform supporting Node.js

Simply run \`npm run build\` and deploy the \`.next\` folder.
