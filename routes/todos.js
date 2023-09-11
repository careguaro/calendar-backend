
/*
    Rutas de Eventos  
    host + /api/todos
*/

const express = require('express');
const router = express.Router();
const { crearTodo, getTodos, eliminarTodo, actualizarTodo } = require('../controllers/todos');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/', getTodos);

router.post(
    '/',
    [
        check('text', 'El texto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTodo
);

router.put('/:id', actualizarTodo);

router.delete('/:id', eliminarTodo);

module.exports = router;