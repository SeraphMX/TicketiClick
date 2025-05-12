/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración esencial para Netlify
  output: 'standalone',

  // Configuración para API Routes
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe'],
    outputFileTracingRoot: path.join(__dirname, '../../')
  },

  // Otras configuraciones
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
