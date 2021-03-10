'use strict';

const mongoose = require('mongoose');

const schema_usuarioAdmin = new mongoose.Schema({
    'usuario': { type: String, required: true },
    'contrasenna': { type: String, required: true },
});

module.exports = mongoose.model('UsuarioAdmin', schema_usuarioAdmin, 'usuarioAdmin');