import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createUser(user: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    const hashedUserDto: UserDto = {
      company: user.company,
      email: user.email,
      name: user.name,
      password: hashedPassword,
      phone: user.phone,
      related_company: user.related_company,
      role: user.role,
    };

    return await this.userRepository.create(hashedUserDto);
  }
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
