const userService = require('../services/users.service');

const getUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};

const getUser = (req, res) => {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Nombre y email son obligatorios'
        });
    }

    const newUser = userService.createUser(name, email);
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = userService.updateUser(id, req.body);

    if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(updatedUser);
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const deleted = userService.deleteUser(id);

    if (!deleted) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(204).send();
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
