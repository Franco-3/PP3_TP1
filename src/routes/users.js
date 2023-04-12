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
        Contraseña: password
    };
    await pool.query('INSERT INTO usuarios set ?', [newUser]);
    res.send('recibido');
});

module.exports = router;