import React from "react";

const StaticRobotFallback = () => {
  const [imageLoaded, setImageLoaded] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = (e) => {
    console.error('Robot image failed to load:', e);
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    console.log('Robot image loaded successfully');
    setImageLoaded(true);
    setImageError(false);
  };
  return (
    <div className="w-full h-[400px] border-[3px] border-indigo-500 rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Main content */}
      <div className="flex items-center justify-center h-full text-white relative z-10">
        <div className="text-center">
          {/* Animated Robot Image with CSS Fallback */}
          <div className="relative">
            {!imageError ? (
              <img 
                src="/RobotImg.webp" 
                alt="Robot - AI-Powered Job Matching"
                className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto hover:animate-pulse transition-all duration-300"
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.6)) brightness(1.1)',
                  imageRendering: 'crisp-edges'
                }}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              /* CSS Robot Fallback */
              <div className="relative inline-block">
                {/* Head */}
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 relative">
                  {/* Eyes */}
                  <div className="absolute top-3 left-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  {/* Mouth */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-500 rounded"></div>
                </div>
                
                {/* Body */}
                <div className="w-20 h-24 bg-gray-400 rounded-lg mx-auto mb-2 relative">
                  {/* Chest panel */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gray-500 rounded border border-gray-600"></div>
                  {/* Buttons */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
                
                {/* Arms */}
                <div className="absolute top-16 -left-6 w-4 h-16 bg-gray-400 rounded-full transform rotate-12 animate-pulse"></div>
                <div className="absolute top-16 -right-6 w-4 h-16 bg-gray-400 rounded-full transform -rotate-12 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                {/* Legs */}
                <div className="flex justify-center space-x-2">
                  <div className="w-6 h-16 bg-gray-500 rounded-lg animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-6 h-16 bg-gray-500 rounded-lg animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            {/* Optional animated glow effect */}
            <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-ping opacity-75 blur-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-[120px] h-[40px] pointer-events-none z-20 bg-gradient-to-tr from-transparent via-transparent to-indigo-500" />
    </div>
  );
};

export default StaticRobotFallback;
