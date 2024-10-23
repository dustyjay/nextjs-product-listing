/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['fakestoreapi.com'], unoptimized: true },
  distDir: 'dist'
}

module.exports = nextConfig
