const http = require('http');
const fs = require('fs');
const path = require('path');

// Pengaturan Port Dinamis agar Lolos dari Eror 111 Choreo
const PORT = process.env.PORT || process.env.APP_PORT || 3000;

const server = http.createServer((req, res) => {
    // Jalur untuk membaca file index.html di dalam folder public
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Halaman Tidak Ditemukan, Kak!</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Maaf, ada masalah internal: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Menyalakan server sesuai instruksi port dinamis dari sistem cloud Choreo
server.listen(PORT, () => {
    console.log(`Sistem Berhasil Aktif! Server memantau port: ${PORT}`);
});