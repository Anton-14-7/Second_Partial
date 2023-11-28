const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 5000;

app.use(cors());

// Proxy la solicitud a la API de Star Wars
app.use('/api/films', createProxyMiddleware({
  target: 'https://swapi.dev',
  changeOrigin: true,
  pathRewrite: {
    '^/api/films/': '/api/films/',
  },
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});