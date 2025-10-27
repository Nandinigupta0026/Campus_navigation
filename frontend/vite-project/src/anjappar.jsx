import React, { useEffect, useState } from "react";

const Anjappar = () => {
  const [menu, setMenu] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/anjappar")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.menu)) {
          setMenu(data.menu);
        } else {
          setError("Menu data is invalid");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch menu");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      flexDirection: "column",
      padding: "20px"
    }}>
      <h1 style={{ marginBottom: "10px" }}>Anjappar's Menu</h1>
      <h2 style={{ marginBottom: "20px" }}>Best Seller List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div style={{ textAlign: "center" }}>
          {menu.length > 0 ? (
            menu.map((item, index) => (
              <p key={index}>
                {item.name} (Price: {item.price}) → Sold: {item.sold}
              </p>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Anjappar;
