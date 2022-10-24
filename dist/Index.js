"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var books_model_1 = __importDefault(require("./books.model"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
var uri = "mongodb://localhost:27017/biblio";
mongoose_1["default"].connect(uri, function (err) {
    if (err)
        console.log(err.message);
    else
        console.log("Successfully Connected!");
});
app.get("/booksParPage", function (req, res) {
    var _a, _b;
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || "1");
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || "5");
    books_model_1["default"].paginate({}, { page: page, limit: size }, function (err, books) {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.get("/booksSearch", function (req, res) {
    var _a, _b;
    var search = req.query.search || "";
    var page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || "1");
    var size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || "5");
    books_model_1["default"].paginate({ title: { $regex: ".*(?i)" + search + ".*" } }, { page: page, limit: size }, function (err, books) {
        if (err)
            res.status(500).send(err);
        else
            res.send(books);
    });
});
app.get("/books", function (req, resp) {
    books_model_1["default"].find(function (err, books) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(books);
    });
});
app.post("/books", function (req, resp) {
    var book = new books_model_1["default"](req.body);
    book.save(function (err) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.get("/books/:id", function (req, resp) {
    books_model_1["default"].findById(req.params.id, function (err, book) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.put("/books/:id", function (req, resp) {
    books_model_1["default"].findByIdAndUpdate(req.params.id, req.body, { "new": true }, function (err, book) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app["delete"]("/books/:id", function (req, resp) {
    books_model_1["default"].findByIdAndRemove(req.params.id, function (err, book) {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.get("/", function (req, resp) {
    resp.send("Hello World");
});
app.listen(8085, function () {
    console.log("Server is running on port 8085");
});
