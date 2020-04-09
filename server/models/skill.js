const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: {
    type: String,
    required: [true, "Укажите заголовок статьи"],
  },
  percents: {
    type: Number,
    default: 0,
    required: [true, "Укажите дату публикации"],
  },
});

const SkillCategorySchema = new Schema({
  category: {
    type: String,
    required: [true, "Укажите заголовок статьи"],
  },
  items: {
    type: Array,
    required: "",
    // default: [],
    children: [SkillSchema],
  },
});

mongoose.model("skill", SkillCategorySchema);
