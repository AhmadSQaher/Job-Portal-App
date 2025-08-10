import React from 'react';

const Logo = ({ 
  size = 64, 
  className = "", 
  showText = true, 
  textClassName = "text-xl font-bold text-gray-900" 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/assets/LINXLogo.webp" 
        alt="LINX Logo" 
        width={size}
        height={size}
        className={`w-${size/4} h-${size/4} object-contain`}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        onError={(e) => {
          // Fallback to styled div if image fails
          e.target.style.display = 'none';
          const fallback = e.target.nextElementSibling;
          if (fallback) {
            fallback.style.display = 'flex';
          }
        }}
      />
      {/* Fallback logo */}
      <div 
        className={`w-${size/4} h-${size/4} bg-blue-600 rounded-xl flex items-center justify-center`}
        style={{display: 'none'}}
      >
        <span className="text-white font-bold text-xl">L</span>
      </div>
      {showText && (
        <span className={`ml-2 ${textClassName}`}>LINX</span>
      )}
    </div>
  );
};

export default Logo;
