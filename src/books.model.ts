import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let bookSchema = new mongoose.Schema({
  titre: { type: String },
  author: { type: String},
  price: { type: Number },
  publishingDate: { type: Date },
  available: { type: Boolean, required: true, default: true },
  quantity: { type: Number, required: true, default: 1 },
});

bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model("Book", bookSchema);
export default Book;
