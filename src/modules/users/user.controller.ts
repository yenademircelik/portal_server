import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@UseGuards(JwtGuard)
@Controller('api')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get('me')
  async getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);
    return user;
  }

  @Post('create_user')
  async createUser(@Body() user: UserDto): Promise<User> {
    const users = await this.userService.createUser(user);
    try {
      return users;
    } catch (error) {
      throw new HttpException(
        'Bad request at Creating User',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('allusers')
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    try {
      return users;
    } catch (error) {
      throw new HttpException(
        'Bad request at Creating User',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('users/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    try {
      return user;
    } catch (error) {
      throw new HttpException(
        'Bad request at Creating User',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
