/**
 * Carga variables de entorno desde el archivo .env
 */
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

/**
 * Ruta absoluta al archivo de usuarios
 */
const userFilePath = path.join(__dirname, 'users.json');

/**
 * Middlewares nativos de Express
 * - express.json(): permite recibir JSON en el body
 * - express.urlencoded(): permite recibir datos de formularios
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware personalizado de logging
 * Se ejecuta en TODAS las peticiones
 */
app.use((req, res, next) => {
    const date = new Date().toISOString();
    console.log(`[${date}] ${req.method} ${req.url}`);
    next(); // permite que la petición continúe
});

/**
 * Puerto del servidor
 */
const PORT = process.env.PORT || 3000;

/* -------------------------------------------------------------------------- */
/*                                FUNCIONES UTIL                               */
/* -------------------------------------------------------------------------- */

/**
 * Lee los usuarios desde el archivo JSON
 */
const readUsers = () => {
    const data = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(data);
};

/**
 * Escribe los usuarios en el archivo JSON
 */
const writeUsers = (users) => {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

/* -------------------------------------------------------------------------- */
/*                                   RUTAS                                     */
/* -------------------------------------------------------------------------- */

/**
 * Ruta raíz (HTML simple de prueba)
 */
app.get('/', (req, res) => {
    res.send(`<h1>Servidor corriendo en el puerto ${PORT}</h1>`);
});

/**
 * Ruta con parámetros
 */
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    res.send(`<h1>Mostrar información del usuario con id: ${id}</h1>`);
});

/**
 * Ruta con query params
 * Ejemplo: /search?termino=node&categoria=backend
 */
app.get('/search', (req, res) => {
    const termino = req.query.termino || 'No especificado';
    const categoria = req.query.categoria || 'No especificada';

    res.send(`
        <h2>Resultado de búsqueda</h2>
        <p>Término: ${termino}</p>
        <p>Categoría: ${categoria}</p>
    `);
});

/**
 * Ruta de documentación (placeholder)
 */
app.get('/docs', (req, res) => {
    res.send('Este endpoint retorna documentación');
});

/**
 * Recepción de datos de formulario
 */
app.post('/form', (req, res) => {
    const name = req.body.name || 'Anónimo';
    const email = req.body.email || 'Sin email';

    res.json({
        message: 'Datos recibidos correctamente',
        data: {
            nombre: name,
            email
        }
    });
});

/**
 * API genérica para recibir datos
 */
app.post('/api/data', (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            error: 'No se enviaron datos'
        });
    }

    res.status(201).json({
        message: 'Datos recibidos',
        data
    });
});

/* -------------------------------------------------------------------------- */
/*                              CRUD DE USUARIOS                               */
/* -------------------------------------------------------------------------- */

/**
 * Obtener todos los usuarios
 */
app.get('/api/users', (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer usuarios' });
    }
});

/**
 * Obtener un usuario por ID
 */
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();

    const user = users.find(u => u.id === Number(id));
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
});

/**
 * Crear un nuevo usuario
 */
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Nombre y email son obligatorios'
        });
    }

    const users = readUsers();

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
});

/**
 * Actualizar un usuario existente
 */
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const users = readUsers();
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    users[index] = {
        ...users[index],
        name: name ?? users[index].name,
        email: email ?? users[index].email
    };

    writeUsers(users);
    res.json(users[index]);
});

/**
 * Eliminar un usuario
 */
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();

    const filteredUsers = users.filter(u => u.id !== Number(id));

    if (filteredUsers.length === users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    writeUsers(filteredUsers);
    res.status(204).send();
});

/* -------------------------------------------------------------------------- */
/*                        MIDDLEWARE DE MANEJO DE ERRORES                       */
/* -------------------------------------------------------------------------- */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error interno del servidor'
    });
});

/* -------------------------------------------------------------------------- */
/*                                INICIAR SERVIDOR                             */
/* -------------------------------------------------------------------------- */

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
