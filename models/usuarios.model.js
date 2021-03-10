'use strict';

const mongoose = require('mongoose');

const schema_usuario = new mongoose.Schema({
    'nombre': { type: String, required: true },
    'correo': { type: String, required: true, unique: true },
    'tipo': { type: String, required: true },
    'fecha_nacimiento': { type: String, required: true },
    'genero': { type: String, required: true, },
    'contrasenna': { type: String, required: true },
    'edad': { type: Number, required: true },
    'listas_reproduccion': [{
        'nombre': { type: String, required: true },
        'canciones': [{}]
    }],
    'canciones_favoritas': [{}],
});


module.exports = mongoose.model('Usuarios', schema_usuario, 'usuarios');