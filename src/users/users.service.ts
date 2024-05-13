import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private _users = [
        {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            role: 'admin',
        },
        {
            id: 2,
            name: 'Vijay',
            email: 'vijay@example.com',
            role: 'admin',
        },
        {
            id: 3,
            name: 'Aashu',
            email: 'aashu@example.com',
            role: 'developer',
        },
        {
            id: 4,
            name: 'Armaan',
            email: 'armaan@example.com',
            role: 'student',
        },
    ];

    findAll(param: any) {
        if (param.role) {
            const roleArray = this._users.filter(
                (user) => user.role === param.role,
            );
            if (!roleArray.length)
                throw new NotFoundException(
                    `User ${param.role} role not found`,
                );
            return roleArray;
        }

        return this._users;
    }

    findOne(id: number) {
        const user = this._users.find((user) => user.id === id);
        if (!user) throw new NotFoundException(`User ${id} not found`);
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this._users].sort((a, b) => b.id - a.id);
        const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto };
        this._users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUserDto: UpdatedUserDto) {
        this._users = this._users.map((user) => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto };
            }
            return user;
        });

        return this.findOne(id);
    }

    destroy(id: number) {
        const removedUser = this.findOne(id);
        this._users = this._users.filter((user) => user.id !== id);
        return removedUser;
    }
}
