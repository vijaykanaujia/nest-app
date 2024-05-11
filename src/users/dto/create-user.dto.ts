import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['admin', 'student', 'developer'], {
        message: 'Please enter a valid role',
    })
    role: 'admin' | 'student' | 'developer';
}
