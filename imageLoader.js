'use client'

export default function myImageLoader({ src, width, quality }) {
  // In production, use absolute URLs
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_BASE_URL) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.macenauer.net';
    return `${baseUrl}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }
  
  // In development, use relative URLs
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}