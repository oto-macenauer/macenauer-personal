# Oto Macenauer - Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing my professional experience as a Lead Product Engineer with 14+ years in software development.

## 🚀 Live Demo

Visit: [https://macenauer.net](https://macenauer.net)

## 📋 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Smooth Animations**: Implemented with Framer Motion for elegant transitions
- **Performance Optimized**: Fast loading times with Next.js optimization
- **Docker Ready**: Containerized for easy deployment
- **SEO Friendly**: Properly configured metadata and sitemap

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Docker-ready

## 📁 Project Structure

```
personal-website/
├── app/                # Next.js app directory
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Resume.tsx      # Experience & Education
│   ├── Contact.tsx     # Contact section
│   └── SocialLinks.tsx # Social media links
├── public/            # Static assets
│   └── images/        # Images (profile photo, etc.)
├── Dockerfile         # Docker configuration
└── docker-compose.yml # Docker Compose setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oto-macenauer/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Using Docker CLI

```bash
# Build the image
docker build -t oto-macenauer-portfolio .

# Run the container
docker run -p 3000:3000 oto-macenauer-portfolio
```

For detailed Docker deployment instructions, see [README.Docker.md](./README.Docker.md)

## 📝 Customization

### Updating Content

- **Personal Info**: Edit components in `/components` directory
- **Experience**: Update the experience array in `/components/Resume.tsx`
- **Education**: Modify the education array in `/components/Resume.tsx`
- **Skills**: Edit the skills array in `/components/About.tsx`
- **Social Links**: Update URLs in `/components/SocialLinks.tsx`

### Styling

- **Colors**: Modify Tailwind classes throughout components
- **Fonts**: Update font configuration in `/app/layout.tsx`
- **Animations**: Adjust Framer Motion settings in components

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `Dockerfile` - Docker build configuration
- `docker-compose.yml` - Docker Compose configuration

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

- Primary: Blue (#2563eb)
- Secondary: Purple (#9333ea)
- Background: White/Gray gradients
- Text: Gray shades (#111827 to #6b7280)

## 🤝 Connect

- **LinkedIn**: [oto-macenauer-574a844b](https://linkedin.com/in/oto-macenauer-574a844b)
- **GitHub**: [oto-macenauer](https://github.com/oto-macenauer)
- **Bluesky**: [@otomacenauer.bsky.social](https://bsky.app/profile/otomacenauer.bsky.social)
- **Website**: [macenauer.net](https://macenauer.net)

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

**© 2025 Oto Macenauer. All rights reserved.**