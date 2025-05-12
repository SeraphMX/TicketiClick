/** @type {import('next').NextConfig} */
const nextConfig = {
  // Elimina 'output: export' completamente
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  // Habilita el modo serverless para Netlify
  output: 'standalone', // ¡Esta línea es crucial!
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['stripe']
  }
}

module.exports = nextConfig
