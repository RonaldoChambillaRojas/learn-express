const userService = require('../services/users.service');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Datos obligatorios' });
        }

        const newUser = await userService.createUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
