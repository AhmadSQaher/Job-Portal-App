import React, { Suspense, lazy, useState, useRef, useCallback, useEffect } from "react";
import StaticRobotFallback from "./StaticRobotFallback";

// Error Boundary for Spline Component
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('SplineErrorBoundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Spline Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <StaticRobotFallback />;
    }

    return this.props.children;
  }
}

// Lazy load Spline with better error handling
const Spline = lazy(() => 
  import("@splinetool/react-spline")
    .then(module => {
      console.log('✅ @splinetool/react-spline loaded successfully');
      return { default: module.default };
    })
    .catch(error => {
      console.error('❌ Failed to load Spline module:', error);
      // Return the static fallback component
      return { default: StaticRobotFallback };
    })
);

const LoadingFallback = () => (
  <div className="w-full h-full border-[3px] border-indigo-500 rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
    <div className="flex items-center justify-center h-full text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <div className="text-lg">Initializing 3D Scene...</div>
      </div>
    </div>
  </div>
);

const SplineEmbed = ({ scene, className = "", style = {} }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(false);
  const splineRef = useRef(null);

  // Working scene URLs (prioritized by reliability)
  const sceneUrls = [
    scene || "https://prod.spline.design/VdhvnwERo8cr6HiK/scene.splinecode", // Use provided scene or default
    "https://prod.spline.design/6Wq5GmWFeGF2hFrV/scene.splinecode", // Alternative
  ];

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [loadAttempts, setLoadAttempts] = useState(0);

  const handleError = useCallback((error) => {
    console.error("Spline error:", {
      error,
      scene: sceneUrls[currentSceneIndex],
      attempt: loadAttempts + 1
    });
    
    const newAttempts = loadAttempts + 1;
    setLoadAttempts(newAttempts);
    
    // Try next scene if available and under attempt limit
    if (currentSceneIndex < sceneUrls.length - 1 && newAttempts <= 2) {
      console.log(`🔄 Trying scene ${currentSceneIndex + 1}...`);
      setCurrentSceneIndex(currentSceneIndex + 1);
      return;
    }
    
    // If all scenes failed or too many attempts, use static fallback
    console.log('🎭 Using static robot fallback');
    setHasError(true);
    setIsLoading(false);
    setUseStaticFallback(true);
  }, [currentSceneIndex, loadAttempts, sceneUrls]);

  const handleLoad = useCallback((splineApp) => {
    console.log('✅ Spline scene loaded successfully:', {
      app: splineApp,
      scene: sceneUrls[currentSceneIndex]
    });
    setIsLoaded(true);
    setIsLoading(false);
    setHasError(false);
    splineRef.current = splineApp;
  }, [currentSceneIndex, sceneUrls]);

  useEffect(() => {
    console.log('🔄 SplineEmbed component mounted');
    
    // Set a timeout to fallback to static version if loading takes too long
    const timeout = setTimeout(() => {
      if (isLoading && !isLoaded) {
        console.log('⏰ Loading timeout - using static fallback');
        setUseStaticFallback(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading, isLoaded]);

  // If we should use static fallback
  if (useStaticFallback || hasError) {
    return <StaticRobotFallback />;
  }

  return (
    <SplineErrorBoundary>
      <div 
        className={`w-full h-full border-[3px] border-indigo-500 rounded-lg overflow-hidden relative ${className}`}
        style={style}
      >
        {!isLoaded && (
          <div className="absolute inset-0 z-10">
            <LoadingFallback />
          </div>
        )}
        
        <Suspense fallback={<LoadingFallback />}>
          <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Spline
              scene={sceneUrls[currentSceneIndex]}
              style={{ width: "100%", height: "100%" }}
              onError={handleError}
              onLoad={handleLoad}
              onMouseDown={() => {}}
              onMouseUp={() => {}}
              onMouseMove={() => {}}
              onWheel={() => {}}
              renderOnDemand={false}
              camera={{}}
              lights={{}}
            />
          </div>
        </Suspense>
        
        <div className="absolute bottom-0 right-0 w-[120px] h-[40px] pointer-events-none z-20 bg-gradient-to-tr from-transparent via-transparent to-indigo-500" />
      </div>
    </SplineErrorBoundary>
  );
};

export default SplineEmbed;