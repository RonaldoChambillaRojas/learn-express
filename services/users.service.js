const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '..', 'users.json');

const readUsers = () => {
    const data = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

const getAllUsers = () => readUsers();

const getUserById = (id) => {
    const users = readUsers();
    return users.find(u => u.id === Number(id));
};

const createUser = (name, email) => {
    const users = readUsers();

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);
    writeUsers(users);
    return newUser;
};

const updateUser = (id, data) => {
    const users = readUsers();
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) return null;

    users[index] = {
        ...users[index],
        ...data
    };

    writeUsers(users);
    return users[index];
};

const deleteUser = (id) => {
    const users = readUsers();
    const filtered = users.filter(u => u.id !== Number(id));

    if (filtered.length === users.length) return false;

    writeUsers(filtered);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
