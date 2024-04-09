const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Define the path to your index.html
    const indexPath = path.join(__dirname, 'index.html');

    // Read and serve the index.html file
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    // Serve the figlet text for any other request
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('check your route');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

