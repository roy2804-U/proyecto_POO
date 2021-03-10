'use strict';

const mongoose = require('mongoose');

const schema_album = new mongoose.Schema({
    'codigo': { type: String, required: true },
    'nombre': { type: String, required: true },
    'fecha_lanzamiento': { type: Date, required: true },
    'id_artista': { type: String, required: true },
    'cant_canciones': { type: Number, required: true },
    'duracion': { type: Number, required: true },
});

module.exports = mongoose.model('Album', schema_album, 'albumes');