import { Body, Controller, Get,Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('auth')
export class UsersController{
    constructor( private usersService: UsersService){}
    @Post('register')
    async register(@Body() dto:CreateUserDto){
        return this.usersService.register(dto)
    }
}