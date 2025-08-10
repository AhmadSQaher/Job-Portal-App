import React, { useState, useEffect } from 'react';

const LogoImage = ({ 
  className = "w-16 h-16 object-contain", 
  width = "64", 
  height = "64",
  alt = "LINX Logo",
  priority = "high",
  loading = "eager" 
}) => {
  const [imageSrc, setImageSrc] = useState('/LINXLogo.webp');
  const [imageError, setImageError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    if (imageSrc === '/LINXLogo.webp') {
      // Try assets path
      setImageSrc('/assets/LINXLogo.webp');
      setImageError(false);
    } else {
      // Both paths failed, show fallback
      setImageError(true);
      setShowFallback(true);
    }
  };

  if (showFallback) {
    return (
      <div className={`${className} bg-blue-600 rounded-xl flex items-center justify-center`}>
        <span className="text-white font-bold text-xl">L</span>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={priority}
      decoding="sync"
      onError={handleImageError}
    />
  );
};

export default LogoImage;
