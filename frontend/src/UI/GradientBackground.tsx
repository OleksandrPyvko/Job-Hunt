import React, { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat"; // Import the main class

// Paste your exported config here (example shown)
const config = {
  colors: [
    {
      color: "#026477",
      enabled: true,
    },
    {
      color: "#007781",
      enabled: true,
    },
    {
      color: "#3DEEFF",
      enabled: true,
    },
    {
      color: "#496B94",
      enabled: true,
    },
    {
      color: "#022235",
      enabled: true,
    },
  ],
  speed: 6.5,
  horizontalPressure: 8,
  verticalPressure: 8,
  waveFrequencyX: 4,
  waveFrequencyY: 3,
  waveAmplitude: 10,
  shadows: 8,
  highlights: 10,
  colorBrightness: 1,
  colorSaturation: 8,
  wireframe: false,
  colorBlending: 8,
  backgroundColor: "#E07B7B",
  backgroundAlpha: 1,
  grainScale: 1,
  grainSparsity: 0,
  grainIntensity: 0.1,
  grainSpeed: 0.3,
  resolution: 0.5,
  yOffset: 2000,
};

export const GradientBackground = () => {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize the gradient
    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    // Cleanup on unmount
    return () => {
      if (gradientRef.current) {
        gradientRef.current.destroy();
      }
    };
  }, []); // Empty dependency array: run once on mount

  return (
    <div className="relative h-screen w-full">
      {" "}
      {/* Container for full viewport */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          isolation: "isolate",
          zIndex: -10,
          borderRadius: "20px",
        }}
      />
      {/* Your other content goes here, layered on top */}
      <div
        className="relative z-10 p-8"
        style={{
          mixBlendMode: "difference", // Inverts text against the gradient
          color: "cyan",
          fontSize: "4rem", // Optional: Adjust for visibility
          fontWeight: "bold", // Base color for inversion
        }}
      >
        {/* <h1 style={{}}>Your App Content</h1> */}
      </div>
    </div>
  );
};
