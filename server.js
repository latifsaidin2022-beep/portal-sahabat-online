const http = require('http');
const fs = require('fs');
const path = require('path');

// Pengaturan Port Dinamis agar Lolos dari Eror 111 Choreo
const PORT = process.env.PORT || process.env.APP_PORT || 3000;

const server = http.createServer((req, res) => {
    // 💡 PERBAIKAN UTAMA: Jika mengakses halaman utama ('/'), langsung otomatis arahkan ke folder public/index.html
    let urlClean = req.url === '/' ? 'index.html' : req.url;
    
    // Memastikan server membaca file dari dalam folder 'public' secara aman
    let filePath = path.join(__dirname, 'public', urlClean);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Jika file benar-benar tidak ditemukan oleh sistem cloud
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Halaman Tidak Ditemukan, Kak!</h1><p>Pastikan file index.html berada di dalam folder public.</p>', 'utf-8');
            } else {
                // Jika ada masalah jaringan internal server
                res.writeHead(500);
                res.end(`Maaf, ada masalah internal: ${error.code} ..\n`);
            }
        } else {
            // Sukses menampilkan halaman utama Portal Kakak
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Menyalakan server sesuai instruksi port dinamis dari sistem cloud Choreo
server.listen(PORT, () => {
    console.log(`Sistem Berhasil Aktif! Server memantau port: ${PORT}`);
});