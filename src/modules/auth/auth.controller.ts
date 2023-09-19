import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: AuthDto) {
    console.log(user);

    return await this.authService.login(user);
  }

  @Post('register')
  async signUp(@Body() user: UserDto) {
    return await this.authService.signup(user);
  }

}
