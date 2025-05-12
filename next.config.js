/** @type {import('next').NextConfig} */
const nextConfig = {
  // Elimina completamente 'output: export'
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  // Configuración esencial para API routes
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe']
  }
}

module.exports = nextConfig
