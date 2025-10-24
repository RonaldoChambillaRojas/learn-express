require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>El servidor esta corriendo en el puerto ${PORT}</h1>
        `)
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})