const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add', async (req, res) =>{
    const { name, mail, password } = req.body;
    const newUser = {
        Nombre: name,
        Correo: mail,
        Contraseña: password,
        rolUsuario: 1
    };
    await pool.query('INSERT INTO usuarios set ?', [newUser]);
    req.flash('success', 'Usuario agregado correctamente');
    res.redirect('/users');
});

router.get('/', async (req, res) => {
    const users = await pool.query('SELECT * FROM usuarios');
    console.log(users);
    res.render('users', { users });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE idUsuario = ?', [id]);
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/users');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
    res.render('edit', {usuario: usuario[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {name, mail, password} = req.body;
    const newUser = {
        Nombre: name,
        Correo: mail,
        Contraseña: password
    };
    console.log(newUser);
    pool.query('UPDATE usuarios set ? WHERE idUsuario = ?', [newUser, id]);
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/users');
});

module.exports = router;