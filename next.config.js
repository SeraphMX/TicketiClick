/** @type {import('next').NextConfig} */
const nextConfig = {
  // Elimina completamente 'output: export' - incompatible con API routes
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
  },
  // Añade esta configuración crucial
  output: 'standalone' // o "export" si no necesitas API routes
}

module.exports = nextConfig
