import React, { useEffect, useState } from 'react';


const Prim = () => {
  const [mst, setMst] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMST = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/prim');
        const data = await res.json();
        console.log('MST:', data);

        if (data.error) {
          setError(data.error);
        } else {
          // Convert array-of-arrays to objects if needed
          const edges = (data.edges || []).map(item => {
            if (Array.isArray(item)) {
              return { u: item[0], v: item[1], w: item[2] };
            }
            return item; // already object
          });

          setMst(edges);
          setTotalWeight(data.totalWeight || 0);
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
      width: "350px",
      margin: "20px auto",
      boxShadow: "0 0 15px rgba(0,0,0,0.4)"
    }}>
      <h2 style={{ color: "#4CAF50" }}>Minimal Spanning Tree</h2>
      <h4>Infrastructure Connection</h4>
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
    </div>
  )
}

export default Prim;
