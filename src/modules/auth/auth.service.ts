import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from '../users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(user: UserDto) {
    const newUser = await this.userService.createUser({
      ...user,
    });

    const { ...result } = newUser['dataValues'];

    return { user: result };
  }

  async login(dto: AuthDto) {
    const existingUser = await this.userService.findOneByEmail(dto.email);
    if (!existingUser) {
      throw new ForbiddenException('There is no user with this email !');
    }
    const passwdMatch = await bcrypt.compare(
      dto.password.trim(),
      existingUser.password.trim(),
    );

    if (!passwdMatch) {
      throw new ForbiddenException('Incorrect Password !');
    }
    const access_token = await this.signToken(
      existingUser.id,
      existingUser.email,
    );

    return { existingUser, access_token };
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = { userId, email };

    return this.jwtService.signAsync(payload);
  }
}
