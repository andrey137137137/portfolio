const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParallaxSchema = new Schema({
  count: {
    type: Number,
    required: [true, 'Укажите количество слоёв'],
  },
});

mongoose.model('parallax', ParallaxSchema);
