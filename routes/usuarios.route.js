'use strict';

const { json } = require('body-parser');
const { query } = require('express');
const express = require('express');
const Usuarios = require('../models/usuarios.model');
const router = new express.Router();


router.post('/registrar-usuario', (req, res) => {
    let nuevo_usuario = new Usuarios({
        'nombre': req.body.nombre,
        'correo': req.body.correo,
        'tipo': req.body.tipo,
        'fecha_nacimiento': req.body.fecha_nacimiento,
        'genero': req.body.genero,
        'contrasenna': req.body.contrasenna,
        'edad': req.body.edad,
    });
    nuevo_usuario.save((err, usuario_bd) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudo registrar el usuario',
                err
            });
        } else {
            res.json({
                'mensaje': 'Se registró el usuario',
                usuario_bd
            });
        };
    });
});

router.get('/ver-usuarios', (req, res) => {
    let usuarios = Usuarios.find((err, coleccion_usuarios) => {
        if (err) {
            res.json({
                'mensaje': 'No se pudieron ver los usuarios',
                err
            });
        } else {
            res.json({
                'mensaje': 'Lista de usuarios',
                coleccion_usuarios
            });
        };
    });
});


router.get('/buscar-usuario', (req, res) => {
    Usuarios.findOne({ correo: req.query.correo }, (err, usuario) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (usuario) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    usuario
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});


router.get('/buscar-usuario_id', (req, res) => {
    Usuarios.findOne({ _id: req.query._id }, (err, usuario) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (usuario) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    usuario
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});


router.post('/registrar-listas', (req, res) => {
    Usuarios.update({ _id: req.body._id }, {
        $push: {
            'listas_reproduccion': {
                'nombre': req.body.nombre
            }
        }
    }, (error) => {
        if (error) {
            res.json({
                'mensaje': 'No se registró la lista',
                error
            });
        } else {
            res.json({
                'mensaje': 'Se registró la lista',
            });
        }
    })
});

router.post('/registrar-lista-cancion', (req, res) => {
    Usuarios.update({ _id: req.body._id, 'listas_reproduccion._id': req.body.listas_reproduccion }, {
        $push: {
            'listas_reproduccion.$.canciones': req.body.cancion,
        }
    }, (error, cancion) => {
        if (error) {
            res.json({
                'mensaje': 'No se agregó la canción a la lista',
                error
            });
        } else {
            res.json({
                'mensaje': 'Se agregó la canción a la lista',
                cancion
            });
        }
    })
});



router.get('/buscar-lista', (req, res) => {
    Usuarios.findOne({ _id: req.query._id }, {
        'listas_reproduccion': { _id: req.query.listas_reproduccion },
    }, (err, lista) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (lista) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    lista
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});








router.get('/eliminar-usuario', (req, res) => {
    Usuarios.deleteOne({ _id: req.query._id }, (err) => {
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

router.put('/editar-usuario', (req, res) => {
    Usuarios.updateOne({ _id: req.body._id }, {
        $set: {
            nombre: req.body.nombre,
            correo: req.body.correo,
            tipo: req.body.tipo,
            genero: req.body.genero,
            contrasenna: req.body.contrasenna,
            edad: req.body.edad
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



router.post('/editar-lista', (req, res) => {
    Usuarios.update({ _id: req.body._id_usuario, 'listas_reproduccion._id': req.body.listas_reproduccion }, {
        $set: {
            'listas_reproduccion.$.nombre': req.body.nombre
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el playlist',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});




router.get('/eliminar-lista', (req, res) => {
    Usuarios.update({ _id: req.query._id_usuario }, {
        $pull: {
            'listas_reproduccion': { _id: req.query._id_lista },
        }
    }, (err) => {
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





router.post('/registrar-cancion_favorita', (req, res) => {
    Usuarios.update({ _id: req.body._id }, {
        $push: {
            'canciones_favoritas': req.body.cancion
        }
    }, (error) => {
        if (error) {
            res.json({
                'mensaje': 'No se guardó la canción',
                error
            });
        } else {
            res.json({
                'mensaje': 'Se guardó la canción',
            });
        }
    })
});



router.get('/quitar-cancion-fav', (req, res) => {
    Usuarios.update({ _id: req.query.usuario_id }, {
        $pull: {
            'canciones_favoritas': { _id: req.query.cancion_id },
        }
    }, (err) => {
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


router.get('/buscar-cancion-favorita', (req, res) => {
    Usuarios.findOne({ _id: req.query._id }, {
        'canciones_favoritas': { _id: req.query.cancion_id },
    }, (err, cancion) => {
        if (err) {
            res.json({
                'mensaje': 'No se encontró el usuario',
                err
            });
        } else {
            if (cancion) {
                res.json({
                    'mensaje': 'Lista del usuario',
                    cancion
                });
            } else {
                res.json({
                    'mensaje': 'Está vacío',
                });
            }
        };
    });
});


module.exports = router;