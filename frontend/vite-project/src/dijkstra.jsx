import React, { useState } from 'react';

const Dijkstra = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch('http://localhost:5000/api/dijkstra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: source, end: destination })
      });

      const data = await res.json();

      if (data.error) {
        setResult(data.error);
      } else {
        setResult(`Path: ${data.path.join(' -> ')}\nTotal Distance: ${data.totalDist}`);
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

      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
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
    </div>
  );
};

export default Dijkstra;
