import React from 'react'

const dijkstra = () => {
  return (
    <div style={{border:"2px solid black", margin:"20px", padding:"20px", borderRadius:"10px", backgroundColor:"aliceblue", width:"100%", height:"100vh", textAlign:"center", marginRight:"auto", marginLeft:"auto"}}> 
      <h1 color='red'> Dijkstra's Algorithm  </h1>
      <h2>Given a source and destination, this algorithm gives the minimum path from start node to end.</h2>

      <br></br>
      <br></br>
      <form>
       <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
        <label htmlFor="source" style={{ fontSize: "2rem", fontWeight: "600" }} >
            Source Node
        </label>

        <input style={{ fontSize: "1.5rem", fontWeight: "400", borderRadius:"10px" }} type="text" name="source" id="source" placeholder="Enter source node"/>
        </div>

        <br/><br/>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <label style={{fontSize:"2rem", fontWeight:"600"}} id="destination" >Destination Node</label>
        <input style={{fontSize:"1.5rem", fontWeight:"400", borderRadius:"10px"}} type="text" name="destination" id="destination" placeholder='Enter destination node'/>
        </div>
        <br/><br/>
        <input  style={{ fontSize: "2rem", fontWeight: "600" , borderRadius:"10px", position:"absolute", left:"10%" }} type="submit" value="Submit" />
      </form>

      <h2 id="dij"></h2>


    </div>
  )
}

export default dijkstra
