/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
let supabaseHost = '';

try {
  supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : '';
} catch {
  supabaseHost = '';
}

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'via.placeholder.com',
    pathname: '/**',
  },
];

if (supabaseHost) {
  remotePatterns.push({
    protocol: 'https',
    hostname: supabaseHost,
    pathname: '/storage/v1/object/public/**',
  });
}

const nextConfig = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
