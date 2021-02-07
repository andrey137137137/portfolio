const mongoose = require('mongoose');
const { Schema } = mongoose;
const name = 'parallax';

mongoose.model(
  name,
  new Schema({
    count: {
      type: Number,
      required: [true, 'Укажите количество слоёв'],
    },
  }),
  name,
);
