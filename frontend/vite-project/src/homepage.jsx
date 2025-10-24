import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
    let navigate=useNavigate();



    // const [GJCH,setGJCH] = useState(0);
    // const [Main_Gate] = useState(1);
    // const [Admin,setAdmin] = useState(2);
    // const [first_right,setfirst_right] = useState(3);
    // const [second_right,setsecond_right] = useState(4);

    const [loc,setloc]=useState(["GJCH", "Main gate", "Admin block", "Central avenue - first right", "Central avenue - second right", "Central avenue - third right", "MIG", "Orion", "Logos", "EEE Dept", "MME Dept", "Library", "Central avenue - first left", "CSE Dept", "Anjappar"])

    useEffect(() => {
        
            let canvas = document.getElementById("canvas");
            
            let c = canvas.getContext('2d');

            canvas.width = window.innerWidth * 0.5;
            canvas.height = window.innerHeight* 0.8;
            for(let i of loc)
            {
                let x=Math.random() * canvas.width;
                let y=Math.random() * canvas.height;
                c.beginPath();
                c.arc(x,y, 10, 0, Math.PI * 2, false);

                c.fillStyle = "white";
                c.fill();
                c.font = "15px Arial";
                c.fillText(i, x + 15, y + 5);
                c.closePath();
            }

            c.strokeStyle="aliceblue";
            c.lineWidth=2;






        
    }, []);

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Welcome to NIT Tiruchirappalli</h1>
        <h2 style={{textAlign:"center"}}>The Pride Of India</h2>
        <canvas id="canvas" style={{ margin: "0 auto", backgroundColor:"black", }}></canvas>
        <button onClick={() => navigate('/dijkstra')}  style={{position:"relative", left:"80%", top:"80%"}}> Click to find the best path...</button>
        <div display="flex" gap="10px" style={{position:"absolute", left:"52%", top:"10%"  }}>
            <h1>Minimal Spanning Tree</h1>
            <h2>Infrastructure Connection</h2>
            <h3 id="prim"></h3>
            <h2>Prim's Algorithm</h2>
        </div>
        <div display="flex" gap="10px" style={{position:"absolute", left:"75%", top:"10%"  }}>
            <h1>Connections b/w 5 major locations</h1>
            <h2>Quick Navigation</h2>
            <h3 id="floyd"></h3>
            <h2>Floyd Warshall Algorithm</h2>
        </div>
    </div>
  )
}

export default Homepage


