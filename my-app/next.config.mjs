/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // This is the path in your Next.js app that you want to proxy from
        destination: 'http://localhost:3001/:path*', // This is the destination path where your server is running
      },
    ];
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
