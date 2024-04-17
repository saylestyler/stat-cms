const express = require('express');
const request = require('request');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

console.log('#### is the token right', process.env.STAT_CMS_GH_PERSONAL_ACCESS_TOKEN)

app.get('/', (req, res) => {
  // Serve the index.html file
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/posts', (req, res) => {
  const options = {
    url: 'https://api.github.com/repos/saylestyler/tylersayles/contents/src/content/blog',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.STAT_CMS_GH_PERSONAL_ACCESS_TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    } else {
      res.json({ error: 'Unable to fetch data from GitHub' });
    }
    console.log("🚀 ~ file: index.js:29 ~ request ~ error:", error)
  });
});


app.get('/post', (req, res) => {
  const gitUrl = req.query.git_url;
  if (!gitUrl) {
    res.status(400).json({ error: 'Missing git_url parameter' });
    return;
  }

  const options = {
    url: gitUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.STAT_CMS_GH_PERSONAL_ACCESS_TOKEN}`
    }
  };


  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    } else {
      res.json({ error: 'Unable to fetch data from GitHub' });
    }
    console.log("🚀 ~ file: index.js:29 ~ request ~ error:", error)
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});