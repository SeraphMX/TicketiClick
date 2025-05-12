const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe'],
    outputFileTracingRoot: path.join(__dirname, '../../')
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
