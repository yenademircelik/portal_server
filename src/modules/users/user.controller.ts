import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);
    return user;
  }
}
