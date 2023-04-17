const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const user = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [username]);
    console.log(user);
    console.log(user.length);
    if (user.length > 0) {
        console.log('esta por validar la contraseña...');
        const validPassword = await helpers.matchPassword( password, user[0].Contraseña);
        console.log("la validacion dio " + validPassword);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido/a ' + user.Nombre));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    }else{
        console.log("fallo la contraseña, deberia salir el mensaje");
        return done(null, false, req.flash('message' ,'El usuario ingresado no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { email } = req.body;
    const newUser = {
        Nombre: username,
        Correo: email,
        Contraseña: password,
        rolUsuario: 0
    };
    newUser.Contraseña = await helpers.encryptPassword(password);
    
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.idUsuario = result.insertId;
    //console.log(newUser);
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user.idUsuario);
});

passport.deserializeUser(async (id, done) => {
    console.log(id);
    const dataUser = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
    done(null, dataUser[0]);
});