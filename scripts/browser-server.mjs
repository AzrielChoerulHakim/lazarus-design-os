import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

// CI can start its own local server. Managed previews supply LAZARUS_BASE_URL.
export async function browserServer(root) {
  if (process.env.LAZARUS_BASE_URL) return { base: process.env.LAZARUS_BASE_URL.replace(/\/$/, ''), close() {} };
  const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml' };
  const server = http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); res.end(); return; }
    if (pathname.endsWith('/')) pathname += 'index.html';
    const target = path.resolve(root, '.' + pathname);
    if (!target.startsWith(root + path.sep) || pathname.split('/').some(s => s.startsWith('.'))) { res.writeHead(403); res.end(); return; }
    fs.readFile(target, (error, data) => {
      if (error) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'content-type': mime[path.extname(target)] || 'application/octet-stream' }); res.end(data);
    });
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
