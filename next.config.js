/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración esencial para Netlify
  output: 'standalone', // ¡Esta es la clave!

  // Configuraciones adicionales
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
