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
    awsUrl: process.env.awsUrl ?? 'http://172.0.0.1:4566',
    awsBucket: process.env.awsBucket ?? 'student-manager-files',
  },
}

export default nextConfig
