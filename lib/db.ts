import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
const fs = require('fs');

const defaultData = { users: [] }

if (!fs.existsSync('./.data')) {
    fs.mkdirSync('./.data');
}
let db = new LowSync(new JSONFileSync('.data/db.json'), defaultData);

export const getUser = (username) => {
    db.read();
    return db.data.users.find(user => user.username === username);
}

export const getUserById = (id) => {
    db.read();
    return db.data.users.find(user => user.id === id);
}

export const addUser = (user) => {
    db.read();
    const _user = getUser(user.username);
    if (_user) {
        Object.assign(_user, user);
    } else {
        db.data.users.push(user);
    }
    db.write();
}

export const updateCredentials = (username, newCreds) => {
    const user = getUser(username);
    if (user) {
        user.credentials = newCreds;
        db.write();
        return true;
    }
    return false
}

export const resetUsers = () => {
    db.read();
    db.data.users = [];
    db.write();
}