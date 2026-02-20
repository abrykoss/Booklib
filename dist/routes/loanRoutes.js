"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanController_1 = require("../controllers/loanController");
const router = (0, express_1.Router)();
router.post('/', loanController_1.loanController.create);
router.post('/:id/return', loanController_1.loanController.returnBook);
router.get('/', loanController_1.loanController.getAll);
exports.default = router;
