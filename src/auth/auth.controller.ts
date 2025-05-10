import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService)
    {}

    @Post('login')
    async login(@Body() userDto: UserDto): Promise<AuthDto>{
        return this.authService.register(userDto);
    }
}
