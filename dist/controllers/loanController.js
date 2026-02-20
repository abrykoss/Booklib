"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanController = void 0;
const loanService_1 = require("../services/loanService");
exports.loanController = {
    create: (req, res) => res.status(201).json(loanService_1.loanService.create(req.body)),
    returnBook: (req, res) => res.json(loanService_1.loanService.returnBook(req.params.id)),
    getAll: (req, res) => res.json(loanService_1.loanService.getAll()),
};
