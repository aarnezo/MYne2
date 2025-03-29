const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Cek jika server sudah berjalan
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Server mungkin sudah berjalan, tidak perlu restart.');
    } else {
        console.error('Server error:', err);
    }
});