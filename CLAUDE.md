# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev        # Start development server with Turbopack at http://localhost:3000
npm run build      # Build for production with Turbopack
npm run start      # Start production server
npm run lint       # Run ESLint
npx tsc --noEmit   # Type check without emitting files
```

### Docker Deployment
```bash
docker-compose up -d    # Build and start with Docker Compose
docker-compose down     # Stop containers
docker build -t oto-macenauer-portfolio .    # Build Docker image
```

## Architecture

This is a personal portfolio website built with Next.js 15 using the App Router architecture.

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router and Turbopack
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Project Structure
- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Inter font and metadata configuration
  - `page.tsx` - Main landing page composing all sections
- `/components` - React components for portfolio sections:
  - `Hero.tsx` - Hero section with introduction
  - `About.tsx` - About section with skills array
  - `Resume.tsx` - Experience and education arrays
  - `Contact.tsx` - Contact information section
  - `SocialLinks.tsx` - Social media links component

### Key Configuration
- TypeScript paths: `@/*` maps to root directory
- Strict TypeScript mode enabled
- Node.js 20 or higher required
- Deployed at https://macenauer.net

### Content Updates
Personal information, experience, education, and skills are stored directly in their respective component files as arrays or constants. Update these files directly to change content.