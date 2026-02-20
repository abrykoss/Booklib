"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const inMemoryStorage_1 = require("../storage/inMemoryStorage");
const userSchema_1 = require("../schemas/userSchema");
const crypto_1 = require("crypto");
exports.userService = {
    getAll: () => Array.from(inMemoryStorage_1.users.values()),
    getById: (id) => inMemoryStorage_1.users.get(id),
    create: (data) => {
        const validated = userSchema_1.createUserSchema.parse(data);
        const user = {
            id: (0, crypto_1.randomUUID)(),
            ...validated,
        };
        inMemoryStorage_1.users.set(user.id, user);
        return user;
    },
};
