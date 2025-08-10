import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const SplineEmbedTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadAttempts, setLoadAttempts] = useState(0);
  const splineRef = useRef(null);

  // Test different scene URLs
  const sceneUrls = [
    "https://prod.spline.design/VdhvnwERo8cr6HiK/scene.splinecode", // Original
    "https://prod.spline.design/6Wq5GmWFeGF2hFrV/scene.splinecode", // Alternative robot scene
    "https://draft.spline.design/6Wq5GmWFeGF2hFrV/scene.splinecode"  // Draft version
  ];

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const handleLoad = (splineApp) => {
    console.log('✅ Spline loaded successfully:', {
      app: splineApp,
      scene: sceneUrls[currentSceneIndex],
      attempt: loadAttempts + 1
    });
    setIsLoading(false);
    setHasError(false);
    splineRef.current = splineApp;
  };

  const handleError = (error) => {
    console.error('❌ Spline error:', {
      error: error,
      scene: sceneUrls[currentSceneIndex],
      attempt: loadAttempts + 1,
      errorType: error?.name,
      errorMessage: error?.message
    });
    
    const newAttempts = loadAttempts + 1;
    setLoadAttempts(newAttempts);
    
    // Try next scene URL if available
    if (currentSceneIndex < sceneUrls.length - 1 && newAttempts <= 3) {
      console.log(`🔄 Trying alternative scene ${currentSceneIndex + 1}...`);
      setCurrentSceneIndex(currentSceneIndex + 1);
      setIsLoading(true);
      setHasError(false);
      return;
    }
    
    setHasError(true);
    setErrorMessage(error?.message || error?.toString() || 'Failed to load 3D scene');
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('🔄 SplineEmbedTest component mounted');
    
    // Check if Spline is available
    console.log('📦 @splinetool/react-spline version check:', {
      splineComponent: typeof Spline,
      splineAvailable: !!Spline
    });
  }, []);

  const retryLoad = () => {
    console.log('🔄 Retrying Spline load...');
    setHasError(false);
    setIsLoading(true);
    setLoadAttempts(0);
    setCurrentSceneIndex(0);
  };

  if (hasError) {
    return (
      <div className="w-full h-[400px] border border-red-500 rounded-lg flex items-center justify-center bg-red-50">
        <div className="text-center text-red-600 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-lg font-semibold">3D Scene Error</div>
          <div className="text-sm mt-2 mb-3 break-words">{errorMessage}</div>
          <div className="text-xs text-gray-500 mb-4">
            Attempted {loadAttempts} time(s) with {sceneUrls.length} different scenes
          </div>
          <button 
            onClick={retryLoad} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] border border-blue-500 rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center text-blue-600">
            <div className="text-4xl mb-4 animate-spin">🔄</div>
            <div className="text-lg font-semibold">Loading 3D Robot...</div>
            <div className="text-sm mt-2">Attempt {loadAttempts + 1}</div>
            <div className="text-xs mt-1 text-gray-500">Scene {currentSceneIndex + 1}/{sceneUrls.length}</div>
          </div>
        </div>
      )}
      
      <Spline
        scene={sceneUrls[currentSceneIndex]}
        style={{ width: "100%", height: "100%" }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default SplineEmbedTest;
