import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
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
      dto.password,
      existingUser.password,
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
