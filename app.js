require('dotenv').config();
const express = require('express');
// comentario here
const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, 'users.json')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;

/* 
    ESTE METODO RECIVE DOS ARGUMENTOS

    primero la direccion a la que respondera y luego recibe una funcion callback que resbe como 
    argumentos req que hace referencia a la solicitud del usuario y res que ase referencia a la respuesta
    que le daremos al usuario.
*/

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
// res.send: es un metodo del parametro res que nos permite dar como parametro la respuesta que deseamos 
// a este endpoint
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

    // req.body: nos permite acceder al cuerpo de la peticion
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
            // res.status().json: nos permite dar una respuesta mas personalizada
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