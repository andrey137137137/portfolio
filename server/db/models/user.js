const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  lastName: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  login: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  password: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  contacts: {
    type: Array
  }
});

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model("user", UserSchema);
