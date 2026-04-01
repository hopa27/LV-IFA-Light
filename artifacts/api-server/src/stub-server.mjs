import http from 'node:http';

const port = Number(process.env.PORT) || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/api/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'API server deprecated - IFA Lite is now a static site' }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'API server is no longer in use' }));
});

server.listen(port, () => {
  console.log(`Stub API server listening on port ${port}`);
});
