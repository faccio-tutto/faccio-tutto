/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true, // Importantissimo! Aruba non ottimizza immagini server-side
    },
  };
  
  module.exports = nextConfig;
  