import React, { useEffect, useState, useRef } from 'react';

const Prim = () => {
  const [mst, setMst] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);
  const [error, setError] = useState('');

  const canvasRef = useRef(null);

  const nodes = [
    { id: 0, name: 'GJCH', x: 200, y: 100 },
    { id: 1, name: 'Main Gate', x: 400, y: 650 },
    { id: 2, name: 'Admin block', x: 400, y: 500 },
    { id: 3, name: 'Central avenue - first right', x: 300, y: 500 },
    { id: 4, name: 'Central avenue - second right', x: 200, y: 500 },
    { id: 5, name: 'Central avenue - third right', x: 100, y: 500 }, 
    { id: 6, name: 'MIG', x: 100, y: 300 },
    { id: 7, name: 'Orion', x: 200, y: 300 },
    { id: 8, name: 'Logos', x: 500, y: 300 },
    { id: 9, name: 'EEE Dept', x: 600, y: 500 },
    { id: 10, name: 'MME Dept', x: 700, y: 500 },
    { id: 11, name: 'Library', x: 800, y: 500 },
    { id: 12, name: 'Central avenue - first left', x: 500, y: 500 },
    { id: 13, name: 'CSE Dept', x: 800, y: 300 },
    { id: 14, name: 'Anjappar', x: 800, y: 100 },
  ];

  const drawMST = (data) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw MST edges
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 4;
    data.edges.forEach(edge => {
      const fromNode = nodes.find(n => edge[0].toLowerCase().includes(n.name.toLowerCase()));
      const toNode = nodes.find(n => edge[1].toLowerCase().includes(n.name.toLowerCase()));
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = '#FF4136';
        ctx.font = '16px Arial';
        ctx.fillText(edge[2], midX + 5, midY - 5);
      }
    });

    // Draw nodes
    const allNodes = new Set();
    data.edges.forEach(edge => {
      allNodes.add(edge[0]);
      allNodes.add(edge[1]);
    });

    allNodes.forEach(nodeName => {
      const node = nodes.find(n => nodeName.toLowerCase().includes(n.name.toLowerCase()));
      if (node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = '7px Arial';
        ctx.fillText(node.name, node.x - 25, node.y + 25);
      }
    });
  };

  useEffect(() => {
    const fetchMST = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/prim');
        const data = await res.json();

        if (data.error) setError(data.error);
        else {
          const edges = (data.edges || []).map(item =>
            Array.isArray(item) ? { u: item[0], v: item[1], w: item[2] } : item
          );
          setMst(edges);
          setTotalWeight(data.totalWeight || 0);
          drawMST(data);
        }
      } catch (err) {
        setError('Failed to fetch MST from backend.');
        console.error(err);
      }
    };
    fetchMST();
  }, []);

  return (
    <div style={{
      backgroundColor: "#2E2E3F",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      margin: "20px auto",
      maxWidth: "1100px",
      boxShadow: "0 0 15px rgba(0,0,0,0.4)"
    }}>
      <h2 style={{ color: "#4CAF50", marginBottom: "5px" }}>Minimal Spanning Tree</h2>
      <h4 style={{ marginTop: "0", marginBottom: "15px" }}>Infrastructure Connection</h4>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && mst.length === 0 && <p>Loading MST...</p>}

      <ul style={{ textAlign: "left", marginTop: "10px" }}>
        {mst.map((edge, index) => (
          <li key={index}>
            {edge.u} - {edge.v} : {edge.w}
          </li>
        ))}
      </ul>

      {totalWeight !== null && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Total weight: {totalWeight}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: '#11111F',
            borderRadius: '15px',
            boxShadow: '0 0 30px rgba(0,0,0,0.7)'
          }}
        />
      </div>
    </div>
  );
};

export default Prim;
