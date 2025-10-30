# DM-Gemini - AI Assistant

A modern, fully responsive AI web application built with Next.js, featuring a beautiful gradient background, glassmorphism UI, and a ChatGPT x Google Gemini inspired interface.

## Features

- ✨ Modern glassmorphism UI design
- 🎨 Beautiful gradient background with animated glow effects
- 💬 Real-time chat interface with message history
- 📱 Fully responsive design
- 🎯 Clean and minimal interface
- ⚡ Built with Next.js 15 App Router
- 🎨 Styled with Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui + Radix UI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd dm-gemini
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

\`\`\`
dm-gemini/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Home page (main chat interface)
│   └── globals.css          # Global styles and Tailwind config
├── components/
│   ├── Header.tsx           # Top header with logo
│   ├── ChatSidebar.tsx      # Left sidebar with chat history
│   ├── ChatArea.tsx         # Main chat display area
│   ├── InputBar.tsx         # Bottom input field
│   ├── figma/               # Figma-specific components
│   └── ui/                  # Shadcn UI components
├── lib/
│   └── utils.ts             # Utility functions
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
\`\`\`

## Color Scheme

The app uses a stunning gradient background:

- **Primary Gradient**: `from-blue-900 via-purple-900 to-cyan-900`
- **Blue**: `#1e3a8a`
- **Purple**: `#581c87`
- **Cyan**: `#164e63`

## Customization

### Changing Colors

Edit the gradient in `/app/page.tsx`:
\`\`\`tsx
<div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900">
\`\`\`

### Modifying Components

All components are in the `/components` directory and can be easily customized.

### Adding Features

The app is structured to easily add new features:
- Chat persistence with local storage or database
- AI integration (OpenAI, Google Gemini, etc.)
- User authentication
- Message formatting (Markdown, code highlighting)
- Voice input/output

## Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
