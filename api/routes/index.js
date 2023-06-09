module.exports = (app) => {
    const users = require('../controllers/user.js');

    app.get('/users', users.list);
    app.post('/user', users.create);
    app.post('/user/auth', users.login);
    app.patch('/user', users.update);
    app.delete('/user', users.delete);

}