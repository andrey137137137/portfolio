const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  icon: {
    type: String
  },
  name: {
    type: String
  },
  value: {
    type: String
  }
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  lastName: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  userName: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  password: {
    type: String,
    required: [true, "Укажите описание картинки"]
  },
  contacts: {
    type: Array,
    children: [ContactSchema]
  }
});

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model("user", UserSchema);
