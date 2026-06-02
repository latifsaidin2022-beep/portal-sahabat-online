const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Mengatur folder 'public' sebagai tempat menyimpan file tampilan (HTML)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Aplikasi Nelayan aktif di http://localhost:${PORT}`);
});