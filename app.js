require('dotenv').config();
const express = require('express');

const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'users.json')

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
        <h2>Resultado de busquedas:</h2>
        <p>1: ${terms}</p>
        <p>2: ${category}</p>
        `)
})

app.get('/docs', (req, res) => {
    res.send('This endpoint return docs');
})

app.post('/form', (req, res) => {
    const name = req.body.name || 'anonimo';
    const email = req.body.email || 'sin email';
    res.json({
        message: 'Datos entregados',
        data:{ 
            nombre: name,
            email
        }
    })
})

app.post('/api/data', (req, res) => {
    const data = req.body;
    if(!data || Object.keys(data) === 0){
        return res.status(400).json({
            error: 'No se emvio datos',
        })
    }

    res.status(201).json({
        message: 'Datos recibidos',
        data
    })
})

app.get('/users', (req, res) => {
    fs.readFile(userFilePath, 'utf-8', (err, data) => {
        if ( err ) {
            return res.status(500).json({
                error: 'Error conexion de datos.'
            })
        }

        const users = JSON.parse(data);
        res.json(users)

    })
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})