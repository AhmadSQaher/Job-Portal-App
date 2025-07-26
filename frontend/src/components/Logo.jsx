import React from "react";

const Logo = ({ className = "", size = "md", showText = true }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          className={`${sizeClasses[size]} drop-shadow-lg`}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* L - Blue gradient */}
          <path d="M8 8H16V40H8V8Z" fill="url(#blueGradient)" />

          {/* I - Golden gradient */}
          <path d="M20 8H28V40H20V8Z" fill="url(#goldGradient)" />

          {/* N - Blue gradient */}
          <path d="M32 8H40V40L32 16V40H32V8Z" fill="url(#blueGradient)" />

          {/* X with upward arrow - Blue and Gold */}
          <path
            d="M42 8L48 16L42 24L48 32L42 40L36 32L42 24L36 16L42 8Z"
            fill="url(#blueGradient)"
          />

          {/* Upward arrow extension */}
          <path
            d="M42 8L48 16L42 24L48 32L42 40L36 32L42 24L36 16L42 8Z"
            fill="url(#goldGradient)"
            opacity="0.7"
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="blueGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient
              id="goldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="text-center">
          <span
            className={`${textSizes[size]} font-bold text-blue-900 tracking-wider`}
          >
            LINX
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
