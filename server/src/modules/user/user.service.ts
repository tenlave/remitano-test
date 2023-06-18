import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { email: email } })
  }

  async createUser(email: string, password: string): Promise<void> {
    const newUser = this.userRepo.create();
    newUser.email = email;
    newUser.password = password;

    await this.userRepo.save(newUser);
  }
}
