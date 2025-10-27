import React, { useState } from 'react';
import { useRef } from 'react';

const Dijkstra = () => {

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

  const edges = [
    { from: 0, to: 7, weight: 300 },
    { from: 0, to: 8, weight: 294 },
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
    { from: 2, to: 12, weight: 93 },
     { from:12, to: 9, weight: 55 },
      { from:7, to: 4, weight: 140 },
       { from:14, to: 13, weight: 140 },
  ];

  const locations = [
      "GJCH", "Main gate", "Admin block", "Central avenue - first right",
      "Central avenue - second right", "Central avenue - third right", "MIG",
      "Orion", "Logos", "EEE Dept", "MME Dept", "Library",
      "Central avenue - first left", "CSE Dept", "Anjappar"
    ];
  

  let doo=(data) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    for (let i = 0; i < data.path.length - 1; i++) {
  const from = nodes.find(n => n.name === data.path[i]);
  const to = nodes.find(n => n.name === data.path[i + 1]);

  if (from && to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = 'yellow';  
    ctx.lineWidth = 4;
    ctx.stroke();

    const matchedEdge = edges.find(
      e =>
        (nodes[e.from].name === from.name && nodes[e.to].name === to.name) ||
        (nodes[e.from].name === to.name && nodes[e.to].name === from.name)
    );

    if (matchedEdge) {
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2.0;
      ctx.fillStyle = '#FF4136';
      ctx.font = '16px Arial';
      ctx.fillText(matchedEdge.weight, midX + 5, midY - 5);
    }
  }
}


    data.path.forEach(node => {
  const matchedNode = nodes.find(n => n.name === node);

  if (matchedNode) {
 
    ctx.beginPath();
    ctx.arc(matchedNode.x, matchedNode.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = '7px Arial';
    ctx.fillText(matchedNode.name, matchedNode.x - 25, matchedNode.y  + 45);
  }
});

  };


  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/dijkstra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: source, end: destination })
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        setResult(data.error);
      } else {
        setResult(`Path: ${data.path.join(' -> ')}\nTotal Distance: ${data.totalDist}\nEffective Distance: ${data.effectiveDist} `);
        doo(data);
      }
    } catch (err) {
      setResult('Error connecting to server');
      console.error(err);
    }
  };

  return (
    <div style={{
      border: "2px solid black",
      margin: "20px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#f0f8ff",
      width: "80%",
      minHeight: "80vh",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}> 
      <h1 style={{ color: '#FF4500' }}>Dijkstra's Algorithm</h1>
      <p>Enter the source and destination nodes to find the shortest path.</p>

      <form onSubmit={handleSubmit}style={{ marginTop: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="source" style={{ fontSize: "1.2rem", marginRight: "10px" }}>Source Node:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source node"
            style={{ padding: "5px 10px", fontSize: "1rem", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="destination" style={{ fontSize: "1.2rem", marginRight: "10px" }}>Destination Node:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination node"
            style={{ padding: "5px 10px", fontSize: "1rem", borderRadius: "5px" }}
          />
        </div>

        <button type="submit" style={{
          backgroundColor: '#32CD32',
          color: 'white',
          padding: "10px 20px",
          fontSize: "1.1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Find Shortest Path
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: "30px",
          backgroundColor: "#e6f7ff",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "1.2rem",
          whiteSpace: 'pre-line'
        }}>
          {result}
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ backgroundColor: '#11111F', borderRadius: '15px', boxShadow: '0 0 30px rgba(0,0,0,0.7)' }}
      />

      
    </div>
  );
};

export default Dijkstra;
