import { users } from '../storage/inMemoryStorage';
import { User } from '../types';

import { createUserSchema } from '../schemas/userSchema';
import { randomUUID } from 'crypto';
// todo
export const userService = {
    getAll: () => Array.from(users.values()),

    getById: (id: string) => users.get(id),

    create: (data: unknown) => {
        const validated = createUserSchema.parse(data);
        const user: User = {
            id: randomUUID(),
            ...validated,
        };
        users.set(user.id, user);
        return user;
    },
};