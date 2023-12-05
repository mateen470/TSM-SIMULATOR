import React, { useRef, useEffect, useState } from 'react';

const GridCanvas = () => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState([{ id: 1, x: 100, y: 100 }]);
  const [dragging, setDragging] = useState(null);

  // Function to draw the grid
  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

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

    items.forEach(item => {
      ctx.fillStyle = 'blue';
      ctx.fillRect(item.x - 10, item.y - 10, 20, 20); // Adjust for zoom and pan
    });

    ctx.restore();


  };

  // Redraw grid when zoom or pan changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawGrid(context);
  }, [zoom, pan,items]);


  // Event handlers for dragging
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Detect if we clicked on any item
    const clickedItem = items.find(item => 
      mouseX > item.x - 10 && mouseX < item.x + 10 && 
      mouseY > item.y - 10 && mouseY < item.y + 10
    );

    if (clickedItem) {
      setDragging(clickedItem.id);
    }
  };
  


  const handleWheel = (e) => {
    const newZoom = zoom - e.deltaY * 0.01;
    setZoom(Math.max(newZoom, 0.1)); // Set a minimum zoom level
  };

  // const handleMouseMove = (e) => {
  //   if (!dragging) return;

  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const mouseX = e.clientX - rect.left;
  //   const mouseY = e.clientY - rect.top;

  //   // Update the position of the dragging item
  //   setItems(items.map(item => 
  //     item.id === dragging 
  //       ? { ...item, x: mouseX, y: mouseY } 
  //       : item
  //   ));
  // };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update the position of the dragging item
    setItems(items.map(item => 
      item.id === dragging 
        ? { ...item, x: mouseX, y: mouseY } 
        : item
    ));
    } else if (e.buttons === 1) { // Left mouse button
      // Update pan offsets
      setPan({
        x: pan.x + e.movementX,
        y: pan.y + e.movementY
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel} // Add the wheel event listener for zooming
    />
  );
};

export default GridCanvas;
