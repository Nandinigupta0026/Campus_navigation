import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './homepage.jsx'
import Dijkstra from './dijkstra.jsx'
import Prim from './prim.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dijkstra" element={<Dijkstra></Dijkstra>} />
        <Route path = "/prim" element={<Prim></Prim>}/>
      </Routes>
    </div>
  )
}

export default App
