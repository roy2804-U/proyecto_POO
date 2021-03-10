'use strict';

const { json } = require('body-parser');
const express = require('express');
const Cancion = require('../models/cancion.model');
const router = new express.Router();


router.post('/registrar-cancion', (req, res) => {
    let cancion_nueva = new Cancion({
        'nombre': req.body.nombre,
        'duracion': req.body.duracion,
        'artista': req.body.artista,
        'album': req.body.album,
    });
    cancion_nueva.save((err, cancion_nu) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo registrar el artista',
                err
            });
        } else {
            res.json({
                'mensaje': 'Se registró el artista',
                cancion_nu
            });
        };
    });
});


router.get('/ver-canciones', (req, res) => {
    let canciones = Cancion.find((err, coleccion_canciones) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudieron ver las canciones',
                err
            });
        } else {
            res.json({
                'mensaje': 'Lista de canciones',
                coleccion_canciones
            });
        };
    });
});


router.get('/buscar-cancion-album', (req, res) => {
    Cancion.find({ album: req.query.album }, (err, can) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (can) {
                res.json({
                    'mensaje': 'Álbum',
                    can
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});



router.get('/eliminar-cancion', (req, res) => {
    Cancion.deleteOne({ _id: req.query._id }, (err) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo eliminar',
                err
            });
        } else {
            res.json({
                'mensaje': 'Eliminado',

            });
        };
    });
});

router.put('/editar-cancion', (req, res) => {
    Cancion.updateOne({ _id: req.body._id }, {
        $set: {
            nombre: req.body.nombre,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el artista',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});







module.exports = router;