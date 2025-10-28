require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>El servidor esta corriendo en el puerto ${PORT}</h1>
        `)
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`<h1>Mostrar informacion con id: ${userId}</h1>`)
})

app.get('/search', (req, res) => {
    const terms = req.query.termino || 'No espesificado';
    const category = req.query.categoria || 'No espeficado';

    res.send(`
        <h2>Resultado de busqueda:</h2>
        <p>1: ${terms}</p>
        <p>2: ${category}</p>
        `)
})

app.get('/docs', (req, res) => {
    res.send('This endpoint return docs')
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})