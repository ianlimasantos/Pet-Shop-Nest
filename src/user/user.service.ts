import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Firestore } from 'firebase-admin/firestore';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './createUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }


    async create(userDto: UserDto): Promise<UserDto> {
        return await this.userRepository.create(userDto);
    }

    async getUser(id: string): Promise<UserDto | null> {
        return await this.userRepository.getUser(id);

    }

    async getUsers(): Promise<UserDto[]> {

        return await this.userRepository.getUsers();
    }

    async update(id: string, userDto: Partial<UserDto>): Promise<boolean> {
        const user = await this.userRepository.getUser(id);
        if (!user) {
            throw new HttpException(`User não encontrado para id ${id}`, HttpStatus.NOT_FOUND);
        }
        if (userDto?.passwordHash) {
            console.log("entrou")
            userDto.passwordHash = hashSync(userDto.passwordHash, 10);
        }
        return await this.userRepository.update(id, userDto);
    }

    async remove(id: string): Promise<boolean> {
        await this.userRepository.deleteUser(id);
        const user = await this.userRepository.getUser(id);
        if (!user) {
            return true;
        }
        return false;
    }

    async findByUserName(username: string): Promise<UserDto | null> {

        return await this.userRepository.getUserByUsername(username);
    }


    private mapDtoToEntity(userDto: UserDto): UserEntity {
        return {
            id: userDto.id,
            username: userDto.username,
            passwordHash: userDto.passwordHash,
        }
    }

    private mapEntityToDto(user: FirebaseFirestore.DocumentData): UserDto {
        return {
            id: user.id,
            username: user.username,
            passwordHash: user.passwordHash
        }
    }

}
