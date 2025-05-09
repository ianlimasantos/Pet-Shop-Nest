import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async create(userDto: UserDto): Promise<UserDto>{
        const newUser = this.mapDtoToEntity(userDto);
        newUser.passwordHash = hashSync(userDto.passwordHash, 10);
        const retorno = await this.userRepository.save(newUser);
        return this.mapEntityToDto(retorno);
    }

    async getUser(id: string) : Promise<UserDto>{
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            throw new HttpException(`User para id ${id} não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        return this.mapEntityToDto(user);

    }

    async update(id:string, userDto: UserDto){
        const user = await this.userRepository.findOne({ where : {id}})

        if(!user){
            throw new HttpException(`User não encontrado para id ${id}`, HttpStatus.NOT_FOUND);
        }
        if(userDto.passwordHash){
            userDto.passwordHash = hashSync(userDto.passwordHash, 10);
        }

        await this.userRepository.update(id, this.mapDtoToEntity(userDto));
    }

    async remove(id: string){
        const user = await this.userRepository.delete(id); 
        if(!user){
            throw new HttpException(`User para ide ${id} não encontrado!`, HttpStatus.NOT_FOUND);
        }
    }


    private mapDtoToEntity(userDto: UserDto): UserEntity{
        return {
            id: userDto.id,
            username: userDto.username,
            passwordHash: userDto.passwordHash,
        }
    }

    private mapEntityToDto(user: UserEntity): UserDto{
        return {
            id: user.id,
            username: user.username,
            passwordHash: user.passwordHash
        }
    }

}
