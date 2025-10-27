const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ---------- DIJKSTRA ROUTE ----------
app.post('/api/dijkstra', (req, res) => {
  const { start, end } = req.body;
  if (!start || !end) return res.status(400).json({ error: 'Start and end required' });

  const cppProcess = spawn('./code.exe', [start, end]);
  let output = '', errorOutput = '';

  cppProcess.stdout.on('data', data => output += data.toString());
  cppProcess.stderr.on('data', data => errorOutput += data.toString());

  cppProcess.on('close', code => {
    if (code !== 0) return res.status(500).json({ error: 'C++ error', details: errorOutput });
    try { res.json(JSON.parse(output.trim())); }
    catch { res.status(500).json({ error: 'Invalid JSON from C++', details: output }); }
  });
});

// ---------- PRIM ROUTE ----------


// app.get('/api/prim', (req, res) => {
//   const cppProcess = spawn('./code.exe'); // no arguments → Prim

//   let output = '';
//   let errorOutput = '';

//   cppProcess.stdout.on('data', data => output += data.toString());
//   cppProcess.stderr.on('data', data => errorOutput += data.toString());
//   console.log(output || "hiiii");

//   cppProcess.on('close', code => {
//     if (code !== 0) {
//       return res.status(500).json({ error: 'C++ error', details: errorOutput });
//     }

//     try {
//       console.log("Entered prim backend");
//       const edges = [];
//       let totalWeight = 0;

//       // Split output into lines
//       const lines = output.split('\n');

//       lines.forEach(line => {
//         const match = line.match(/(.+?) - (.+?) : (\d+)/);
//         if (match) {
//           const u = match[1].trim();
//           const v = match[2].trim();
//           const w = parseInt(match[3]);
//           edges.push({ u, v, w });
//           totalWeight += w;
//           console.log("Entered at least 1 arg");
//         }
//       });

//       res.json({ edges, totalWeight });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to parse MST output', details: output });
//     }
//   });
// });

app.get('/api/prim', (req, res) => {
  const cppProcess = spawn('./code.exe');
  let output = '', errorOutput = '';

  cppProcess.stdout.on('data', data => output += data.toString());
  cppProcess.stderr.on('data', data => errorOutput += data.toString());

  cppProcess.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({ error: 'C++ error', details: errorOutput });
    }

    try {
      // Directly parse JSON output from C++
      const result = JSON.parse(output.trim());
      res.json(result);
    } catch (err) {
      console.error("Invalid JSON:", output);
      res.status(500).json({ error: 'Invalid JSON from C++', details: output });
    }
  });
});



// ---------- ANJAPPAR ROUTE ----------
app.get('/api/anjappar', (req, res) => {
  const cppProcess = spawn('./code.exe', ['anjappar']);
  let output = '', errorOutput = '';

  cppProcess.stdout.on('data', data => output += data.toString());
  cppProcess.stderr.on('data', data => errorOutput += data.toString());

  cppProcess.on('close', code => {
    if (code !== 0) 
      return res.status(500).json({ error: 'C++ error', details: errorOutput });

    try {
      const result = JSON.parse(output.trim());
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Invalid JSON from C++', details: output });
    }
  });
});






// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
