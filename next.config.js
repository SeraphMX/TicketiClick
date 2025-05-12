/** @type {import('next').NextConfig} */
const nextConfig = {
  // Elimina 'output: export' para habilitar funciones serverless
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  // Configuración para API routes
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe']
  }
}

module.exports = nextConfig
