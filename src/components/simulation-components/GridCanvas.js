import React, { useRef, useEffect, useState } from 'react';

const GridCanvas = () => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Function to draw the grid
  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();

    // Adjust these values based on zoom and pan
    const gridSize = 50 * zoom;
    const startX = pan.x % gridSize;
    const startY = pan.y % gridSize;

    // Draw vertical lines
    for (let x = startX; x < ctx.canvas.width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }

    // Draw horizontal lines
    for (let y = startY; y < ctx.canvas.height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }

    ctx.strokeStyle = '#ccc';
    ctx.stroke();
  };

  // Redraw grid when zoom or pan changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawGrid(context);
  }, [zoom, pan]);

  // Event handlers for zooming and panning (simplified)
  const handleWheel = (e) => {
    setZoom(zoom + e.deltaY * -0.01);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // If mouse is clicked and moving
      setPan({ x: pan.x + e.movementX, y: pan.y + e.movementY });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
    />
  );
};

export default GridCanvas;
