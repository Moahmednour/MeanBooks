"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
var bookSchema = new mongoose_1["default"].Schema({
    titre: { type: String },
    author: { type: String },
    price: { type: Number },
    publishingDate: { type: Date },
    available: { type: Boolean, required: true, "default": true },
    quantity: { type: Number, required: true, "default": 1 }
});
bookSchema.plugin(mongoose_paginate_1["default"]);
var Book = mongoose_1["default"].model("Book", bookSchema);
exports["default"] = Book;
