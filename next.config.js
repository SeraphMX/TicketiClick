/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Esta línea es crucial
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe']
  }
}

module.exports = nextConfig
