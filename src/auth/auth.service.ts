import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/user/user.dto';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {

    private expiresTime: number;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.expiresTime = +this.configService.get<number>("JWT_EXPIRATION_TIME")!;
    }

    async register(userDto: UserDto): Promise<AuthDto>{
        const user = await this.userService.findByUserName(userDto.username);
        

        if(!user || !compareSync(userDto.passwordHash, user.passwordHash)){
            throw new UnauthorizedException();
        }

        const token = await this.jwtService.signAsync({sub: user.id, username: user.username});

        return {
            token: token,
            expiresIn: this.expiresTime
        }
    }

}
