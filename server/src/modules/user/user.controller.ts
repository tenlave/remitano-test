import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtUser } from '../../shared/decorators/jwt-user.dto';
import { UserEntity } from '../../entities';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('current')
  async getAll(@JwtUser() currentUser): Promise<UserEntity> {
    return await this.userService.findOne(currentUser.email);
  }
}
