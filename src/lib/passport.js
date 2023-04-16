const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done) => {
    console.log(req.body);
    const user = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [username]);
    if (user.length > 0) {
        //console.log( password);
        //console.log( user[0].Contraseña);
        const validPassword = await helpers.matchPassword( password, user[0].Contraseña);
        console.log(validPassword, user[0].Contraseña);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido/a ' + user.Nombre));
        }
    }else{
        return done(null, false, req.flash('message' ,'El usuario ingresado no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { email } = req.body;
    console.log(req.body);
    const newUser = {
        Nombre: username,
        Correo: email,
        Contraseña: password,
        rolUsuario: 1
    };
    newUser.Contraseña = await helpers.encryptPassword(password);
    
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.idUsuario = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.idUsuario);
});

passport.deserializeUser(async (id, done) => {
    const dataUser = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id.idUsuario]);
    done(null, id);
});