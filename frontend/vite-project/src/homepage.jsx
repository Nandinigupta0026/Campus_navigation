import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Static node positions fine-tuned for clarity
  const nodes = [
    { id: 0, name: 'GJCH', x: 150, y: 120 },
    { id: 1, name: 'Main Gate', x: 800, y: 600 },
    { id: 2, name: 'Admin', x: 600, y: 450 },
    { id: 3, name: '1st Right', x: 500, y: 350 },
    { id: 4, name: '2nd Right', x: 400, y: 250 },
    { id: 5, name: '3rd Right', x: 250, y: 300 },
    { id: 6, name: 'MIG', x: 100, y: 250 },
    { id: 7, name: 'Orion', x: 180, y: 150 },
    { id: 8, name: 'Logos', x: 600, y: 150 },
    { id: 9, name: 'EEE', x: 700, y: 350 },
    { id: 10, name: 'MME', x: 750, y: 350 },
    { id: 11, name: 'Library', x: 800, y: 350 },
    { id: 12, name: '1st Left', x: 500, y: 400 },
    { id: 13, name: 'CSE', x: 850, y: 150 },
    { id: 14, name: 'Anjappar', x: 950, y: 120 },
  ];

  const edges = [
    { from: 0, to: 7, weight: 800 },
    { from: 0, to: 8, weight: 299 },
    { from: 0, to: 14, weight: 700 },
    { from: 6, to: 7, weight: 132 },
    { from: 5, to: 6, weight: 55 },
    { from: 5, to: 4, weight: 92 },
    { from: 4, to: 3, weight: 140 },
    { from: 3, to: 2, weight: 125 },
    { from: 2, to: 1, weight: 98 },
    { from: 3, to: 7, weight: 207 },
    { from: 7, to: 8, weight: 447 },
    { from: 8, to: 9, weight: 370 },
    { from: 8, to: 10, weight: 440 },
    { from: 8, to: 12, weight: 320 },
    { from: 8, to: 13, weight: 590 },
    { from: 8, to: 14, weight: 600 },
    { from: 9, to: 10, weight: 125 },
    { from: 10, to: 11, weight: 250 },
    { from: 11, to: 13, weight: 250 },
    { from: 2, to: 4, weight: 93 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    edges.forEach(edge => {
      const from = nodes.find(n => n.id === edge.from);
      const to = nodes.find(n => n.id === edge.to);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Draw weight
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      ctx.fillStyle = '#FF4136';
      ctx.font = '14px Arial';
      ctx.fillText(edge.weight, midX + 5, midY - 5);
    });

    // Draw nodes
    nodes.forEach(node => {
      // Outer circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = '#4CAF50';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.fillText(`${node.id} - ${node.name}`, node.x + 30, node.y + 5);
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#1E1E2F', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: '#FFD700' }}>Campus Navigation Visualizer</h1>
      <canvas
        ref={canvasRef}
        style={{ backgroundColor: '#11111F', borderRadius: '15px', boxShadow: '0 0 30px rgba(0,0,0,0.7)' }}
      />

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => navigate('/dijkstra')}>Dijkstra</button>
        <button style={buttonStyle} onClick={() => navigate('/prim')}>Prim</button>
        <button style={buttonStyle} onClick={() => navigate('/floyd')}>Floyd</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#FF6F61",
  color: "white",
  fontSize: "1.2rem",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
  marginBottom: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)"
};

export default Homepage;
