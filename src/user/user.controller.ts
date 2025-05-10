import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() userDto: UserDto){
        return await this.userService.create(userDto);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<UserDto>{
        return await this.userService.getUser(id);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() userDto: UserDto){
        await this.userService.update(id, userDto);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async remove(@Param('id') id: string){
        return await this.userService.remove(id);
    }
}
