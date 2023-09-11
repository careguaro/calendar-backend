const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
  text: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});

TodoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Todo', TodoSchema);
