/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Importantissimo! Aruba non ottimizza immagini server-side
    },
  };
  
  module.exports = nextConfig;
  