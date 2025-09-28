import React from 'react';

export interface GalleriaScorriDestraASinistraProps {
  images: string[];
  speed: number;
  height: number;
}

const GalleriaScorriDestraASinistra: React.FC<GalleriaScorriDestraASinistraProps> = ({ images, speed, height }) => {
  // Implement your component logic here
  return (
    <div style={{ height }}>
      {/* Render images here */}
      {images.map((src, idx) => (
        <img key={idx} src={src} style={{ height: '100%' }} />
      ))}
    </div>
  );
};

export { GalleriaScorriDestraASinistra };

export default function Page() {
  const images = [
    '/images/phot1.jpg',
    '/images/phot2.jpg',
    '/images/phot3.jpg',
    '/images/phot4.jpg'
  ];

  return <GalleriaScorriDestraASinistra images={images} speed={28} height={220} />;
}