const { response } = require('express');
const Evento = require('../models/Evento');
const Todo = require('../models/Todo');

const getTodos = async (req, res = response) => {
  try {
    const todos = await Todo.find().populate('text');
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const crearTodo = async (req, res = response) => {
  console.log(req.body);
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const todoGuardado = await todo.save();

    res.json({
      ok: true,
      todo: todoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarTodo = async (req, res = response) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: 'Todo no existe con este id',
      });
    }

    // const editarTodo = {
    //   ...,
    //   completed: !todo.completed
    // };

    console.log(req.body);

    const todoActualizado = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

    res.json({
      ok: true,
      evento: todoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const eliminarTodo = async (req, res = response) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: 'Todo no existe con este id',
      });
    }

    await Todo.findByIdAndDelete(todoId);

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getTodos,
  crearTodo,
  actualizarTodo,
  eliminarTodo,
};
