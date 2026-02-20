"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
exports.userController = {
    getAll: (req, res) => res.json(userService_1.userService.getAll()),
    getById: (req, res) => {
        const user = userService_1.userService.getById(req.params.id);
        user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    },
    create: (req, res) => res.status(201).json(userService_1.userService.create(req.body)),
};
