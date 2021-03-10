'use strict';

const { json } = require('body-parser');
const express = require('express');
const Album = require('../models/album.model');
const router = new express.Router();


router.post('/registrar-album', (req, res) => {
    let album_nuevo = new Album({
        'codigo': req.body.codigo,
        'nombre': req.body.nombre,
        'fecha_lanzamiento': req.body.fecha_lanzamiento,
        'id_artista': req.body.id_artista,
        'cant_canciones': req.body.cant_canciones,
        'duracion': req.body.duracion,
    });
    album_nuevo.save((err, album_nu) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo registrar el álbum',
                err
            });
        } else {
            res.json({
                'mensaje': 'Se registró el álbum',
                album_nu
            });
        };
    });
});


router.get('/ver-albumes', (req, res) => {
    let albumes = Album.find((err, coleccion_albumes) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudieron ver los álbumes',
                err
            });
        } else {
            res.json({
                'mensaje': 'Lista de álbumes',
                coleccion_albumes
            });
        };
    });
});



router.get('/buscar-album', (req, res) => {
    Album.findOne({ codigo: req.query.codigo }, (err, alb) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (alb) {
                res.json({
                    'mensaje': 'Álbum',
                    alb
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});


router.get('/buscar-album-artista', (req, res) => {
    Album.find({ id_artista: req.query.id_artista }, (err, alb) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (alb) {
                res.json({
                    'mensaje': 'Álbum',
                    alb
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});

router.put('/buscar-album-actualizar', (req, res) => {
    Album.updateOne({ codigo: req.body.codigo }, {
        $set: {
            cant_canciones: req.body.cant_canciones,
            duracion: req.body.duracion,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el album',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });
});



router.get('/eliminar-album', (req, res) => {
    Album.deleteOne({ _id: req.query._id }, (err) => {
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

router.put('/editar-album', (req, res) => {
    Album.updateOne({ _id: req.body._id }, {
        $set: {
            nombre: req.body.nombre,
            fecha_lanzamiento: req.body.fecha_lanzamiento,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el álbum',
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


/*
router.put('/buscar-album-actualizar', (req, res) => {
    Album.updateOne({ codigo: req.query.codigo }, { cant_canciones: req.query.cant_canciones, duracion: req.query.duracion }, (err, alb) => {
        if (err) {
            res.json({
                'mensaje': 'No se actualizó el álbum',
                err
            });
        } else {
            if (alb) {
                res.json({
                    'mensaje': 'Álbum',
                    alb
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});

*/