import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Firestore } from 'firebase-admin/firestore';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UserRepository {

    constructor(

        @Inject('FIRESTORE') private readonly firestore: Firestore
    ) { }


    async create(userDto: UserDto): Promise<UserDto> {
        const id = uuid();
        userDto.passwordHash = hashSync(userDto.passwordHash, 10);
        userDto.id = id;
        const docRef = await this.firestore.collection('users').doc(id).set(userDto);


        return userDto;
    }

    async getUser(id: string): Promise<UserDto | null> {
        const user = await this.firestore.collection('users').doc(id).get();
        if (!user.exists) {
            return null;
        }

        return user.data() as UserDto;

    }

    async getUsers(): Promise<UserDto[]> {
        const user = await this.firestore.collection('users').get();
        if (user.empty) {
            return [];
        }

        return user.docs.map(doc => doc.data()) as UserDto[];

    }

    async deleteUser(id: string): Promise<void> {
        await this.firestore.collection('users').doc(id).delete();
    }

    async update(id: string, userDto: Partial<UserDto>): Promise<boolean> {
        userDto.id = id;
        const docRef = await this.firestore.collection('users').doc(id).update(userDto);
        return docRef.writeTime.seconds > 0;
    }

    async getUserByUsername(username: string): Promise<UserDto | null> {
        const user = await this.firestore.collection('users').where("username", "==", username).get();
        if (user.empty) {
            return null;
        }

        return user.docs.shift()?.data() as UserDto;

    }
}
