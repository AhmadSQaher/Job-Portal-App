import React, { useState, useEffect } from "react";

const SplineEmbed = () => {
  const [SplineComponent, setSplineComponent] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        const { default: Spline } = await import("@splinetool/react-spline");
        setSplineComponent(() => Spline);
      } catch (error) {
        console.error("Failed to load Spline:", error);
        setHasError(true);
      }
    };

    loadSpline();
  }, []);

  if (hasError) {
    return (
      <div
        style={{
          width: "100%",
          height: "400px",
          border: "3px solid #6366f1",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤖</div>
          <div>3D Robot Experience</div>
          <div style={{ fontSize: "14px", marginTop: "8px", opacity: 0.8 }}>
            Interactive 3D Model
          </div>
        </div>
      </div>
    );
  }

  if (!SplineComponent) {
    return (
      <div
        style={{
          width: "100%",
          height: "400px",
          border: "3px solid #6366f1",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤖</div>
          <div>Loading 3D Robot...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        border: "3px solid #6366f1",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <SplineComponent
        scene="https://prod.spline.design/VdhvnwERo8cr6HiK/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Optional: Add a custom overlay to help mask the watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "120px",
          height: "40px",
          background: "linear-gradient(45deg, transparent 50%, #6366f1 50%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default SplineEmbed;
