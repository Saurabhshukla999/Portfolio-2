import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = normalize(join(root, pathname));
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) {
      res.writeHead(403, { 'content-type': 'text/plain' });
      return res.end('forbidden');
    }
    const s = await stat(file).catch(() => null);
    if (!s || !s.isFile()) {
      if (!extname(pathname)) {
        res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
        return res.end('<h1>404</h1><p>This route is not mirrored. Only the single-page site root is available.</p><p><a href="/">Back to the homepage</a></p>');
      }
      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end('not found: ' + pathname);
    }
    res.writeHead(200, {
      'content-type': types[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    createReadStream(file).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end(String(err));
  }
});

const port = Number(process.env.PORT || 8137);
server.listen(port, () => {
  console.log(`personalized portfolio (backed by the meermohsin mirror) running at http://localhost:${port}`);
});
