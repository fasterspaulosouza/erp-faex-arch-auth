import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    await user.createHashPassword(user.password);
    await this.userRepo.create(user);
    return user;
  }
}
