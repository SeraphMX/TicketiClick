/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['stripe'],
    outputFileTracingExcludes: {
      '**/*': ['./supabase/functions/**/*']
    }
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
