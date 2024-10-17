const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Statik dosyalar için "public" dizini
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı.');

    // Müzik parçası alma
    socket.on('music track', (track) => {
        console.log('Parça alındı: ' + track);
        // Tüm kullanıcılara müzik parçasını gönder
        io.emit('music track', track);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı.');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

