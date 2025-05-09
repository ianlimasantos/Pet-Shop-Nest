import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() userDto: UserDto): Promise<UserDto>{
        return await this.userService.create(userDto);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<UserDto>{
        return await this.userService.getUser(id);
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() userDto: UserDto){
        await this.userService.update(id, userDto);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string){
        return await this.userService.remove(id);
    }
}
