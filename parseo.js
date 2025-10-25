const express = require('express');
const app = express();

// Middleware personalizado que muestra qué llega antes del parseo
app.use((req, res, next) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📥 ANTES de express.json()');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('req.body:', req.body); // undefined
    
    let rawData = '';
    req.on('data', chunk => {
        rawData += chunk.toString();
        console.log('📦 Chunk recibido:', chunk.toString());
    });
    
    req.on('end', () => {
        console.log('📄 Datos completos (string):', rawData);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
    
    next();
});

// Ahora sí, parseamos
app.use(express.json());

app.post('/test', (req, res) => {
    console.log('✅ DESPUÉS de express.json()');
    console.log('req.body:', req.body);
    console.log('Tipo:', typeof req.body);
    console.log('Es objeto?:', req.body instanceof Object);
    
    res.json({ recibido: req.body });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});