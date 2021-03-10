'use strict';

const mongoose = require('mongoose');

const schema_artista = new mongoose.Schema({
    'nombre': { type: String, required: true },
    'disquera': { type: String, required: true },
    'fecha_nacimiento': { type: Date, required: true },
    'edad': { type: String, required: true },
});

module.exports = mongoose.model('Artistas', schema_artista, 'artistas');