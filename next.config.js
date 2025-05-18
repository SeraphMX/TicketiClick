/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  // Configuración para paquetes externos
  serverExternalPackages: ['stripe'],

  // Configuración correcta para excluir archivos del tracing
  outputFileTracingExcludes: {
    '**/*': ['node_modules/**/@supabase/functions/**/*']
  },
  experimental: {
    viewTransition: true
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      include: /supabase[\\/]functions/,
      use: 'null-loader'
    })
    return config
  }
}

module.exports = nextConfig
