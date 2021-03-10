'use strict';

const { json } = require('body-parser');
const express = require('express');
const Artista = require('../models/artista.model');
const router = new express.Router();


router.post('/registrar-artista', (req, res) => {
    let artista_nuevo = new Artista({
        'nombre': req.body.nombre,
        'disquera': req.body.disquera,
        'fecha_nacimiento': req.body.fecha_nacimiento,
        'edad': req.body.edad,
    });
    artista_nuevo.save((err, artista_nu) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo registrar el artista',
                err
            });
        } else {
            res.json({
                'mensaje': 'Se registró el artista',
                artista_nu
            });
        };
    });
});



router.get('/buscar-artista', (req, res) => {
    Artista.findOne({ nombre: req.query.nombre }, (err, artista) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (artista) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    artista
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});


router.get('/artista-id', (req, res) => {
    Artista.findOne({ _id: req.query._id }, (err, artista) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (artista) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    artista
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});

router.get('/ver-artistas', (req, res) => {
    let artistas = Artista.find((err, coleccion_artistas) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudieron ver los usuarios',
                err
            });
        } else {
            res.json({
                'mensaje': 'Lista de usuarios',
                coleccion_artistas
            });
        };
    });
});


router.get('/eliminar-artista', (req, res) => {
    Artista.deleteOne({ _id: req.query._id }, (err) => {
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

router.put('/editar-artista', (req, res) => {
    Artista.updateOne({ _id: req.body._id }, {
        $set: {
            nombre: req.body.nombre,
            disquera: req.body.disquera,
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