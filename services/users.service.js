const fs = require('fs/promises');
const path = require('path');

const userFilePath = path.join(__dirname, '..', 'users.json');

const readUsers = async () => {
    const data = await fs.readFile(userFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeUsers = async (users) => {
    await fs.writeFile(userFilePath, JSON.stringify(users, null, 2));
};

module.exports = {
    readUsers,
    writeUsers
};
