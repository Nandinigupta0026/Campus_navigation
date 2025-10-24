const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend domain
app.use(express.json()); // Parse JSON request bodies

// POST /api/dijkstra endpoint
app.post('/api/dijkstra', (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end locations are required' });
  }

  const cppProcess = spawn('./your_cpp_executable', [start, end]); // Adjust executable path

  let output = '';
  cppProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  cppProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  cppProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'C++ program exited with error' });
    }
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      console.error('Failed to parse JSON output:', err);
      res.status(500).json({ error: 'Invalid output format from C++ program' });
    }
  });
});

// Sample GET /api/prim endpoint (no input params)
app.get('/api/prim', (req, res) => {
  const cppProcess = spawn('./your_cpp_prim_executable');

  let output = '';
  cppProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  cppProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  cppProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'C++ program exited with error' });
    }
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      console.error('Failed to parse JSON output:', err);
      res.status(500).json({ error: 'Invalid output format from C++ program' });
    }
  });
});

// You can similarly add /api/floyd endpoint

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
