require('dotenv').config();
const express = require('express');

const usersRoutes = require('./routes/users.routes');
const logger = require('./middlewares/logger.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middlewares globales
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

/**
 * Rutas
 */
app.get('/', (req, res) => {
    res.send(`<h1>Servidor corriendo en el puerto ${PORT}</h1>`);
});

app.use('/api/users', usersRoutes);

/**
 * Middleware de errores
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});
