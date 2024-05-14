/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    backendRoute: process.env.backendRoute ?? 'http://127.0.0.1:8080',
  },
}

export default nextConfig
