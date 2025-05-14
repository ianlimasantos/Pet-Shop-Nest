import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() userDto: UserDto): Promise<UserDto> {
        return await this.userService.create(userDto);
    }

    @Get('/search-by-username')
    async getUserByUserName(@Query() body: { username: string }): Promise<UserDto | null> {
        return await this.userService.findByUserName(body.username);
    }

    //@UseGuards(AuthGuard)
    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<UserDto | null> {
        return await this.userService.getUser(id);
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        return await this.userService.getUsers();
    }

    //@UseGuards(AuthGuard)
    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() userDto: Partial<UserDto>) {
        //return userDto;
        return await this.userService.update(id, userDto);
    }

    //@UseGuards(AuthGuard)
    @Delete('/:id')
    async remove(@Param('id') id: string): Promise<boolean> {
        return await this.userService.remove(id);
    }


}
