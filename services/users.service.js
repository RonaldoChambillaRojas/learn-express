const { readUsers, writeUsers } = require('./users.repository');

const getAllUsers = async () => {
    return await readUsers();
};

const getUserById = async (id) => {
    const users = await readUsers();
    return users.find(u => u.id === Number(id));
};

const createUser = async (name, email) => {
    const users = await readUsers();

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);
    await writeUsers(users);
    return newUser;
};

const updateUser = async (id, data) => {
    const users = await readUsers();
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) return null;

    users[index] = { ...users[index], ...data };
    await writeUsers(users);
    return users[index];
};

const deleteUser = async (id) => {
    const users = await readUsers();
    const filtered = users.filter(u => u.id !== Number(id));

    if (filtered.length === users.length) return false;

    await writeUsers(filtered);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
