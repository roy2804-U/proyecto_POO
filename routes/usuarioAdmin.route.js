'use strict';

const { json } = require('body-parser');
const express = require('express');
const UsuarioAdmin = require('../models/usuarioAdmin.model');
const router = new express.Router();


router.post('/registrar-usuarioAdmin', (req, res) => {
    let usuario_Admin = new UsuarioAdmin({
        'usuario': req.body.usuario,
        'contrasenna': req.body.contrasenna,
    });
    usuario_Admin.save((err, admin_bd) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo registrar el usuario admin',
                err
            });
        } else {
            res.json({
                'mensaje': 'Se registró el usuario admin',
                admin_bd
            });
        };
    });
});

router.get('/usuario-admin', (req, res) => {
    let usuario = UsuarioAdmin.find((err, usuarioAdmin) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo encontrar el usuario admin',
                err
            });
        } else {
            res.json({
                'mensaje': 'Usuario admin',
                usuarioAdmin
            });
        };
    });
});

module.exports = router;