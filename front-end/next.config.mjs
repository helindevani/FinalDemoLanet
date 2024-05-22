/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
