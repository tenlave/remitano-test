import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignInSuccessDto, TokenUserInfoDto } from './dtos';
import { ENV_CONST } from '../../shared/consts';
import { UserService } from '../user/user.service';
import { AuthErrorConst } from './consts';
import { UserEntity } from '../../entities';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async signUp(dto: AuthDto): Promise<boolean> {
    const user = await this.userService.findOne(dto.email);
    if (user) throw new ForbiddenException(AuthErrorConst.UserAlreadyExisted);
    await this.userService.createUser(dto.email, dto.password);
    return true;
  }

  async signIn(req: AuthDto): Promise<SignInSuccessDto> {
    const user = await this.userService.findOne(req.email);

    if (!user || user.password != req.password)
      throw new ForbiddenException(AuthErrorConst.SignInFail);

    return this.signToken(user.id, user.email);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOne(email);
    if (!user || user.password !== password)
      throw new ForbiddenException(AuthErrorConst.SignInFail);
    delete user.password;
    return user;
  }

  private async signToken(userId: number, email: string): Promise<SignInSuccessDto> {
    const payload: TokenUserInfoDto = {
      sub: userId.toString(),
      email
    };
    const secret = process.env[ENV_CONST.JWT_SEC];
    const expiresIn = process.env[ENV_CONST.JWT_TOKEN_EXPIRE];

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret
    });

    return { accessToken };
  }
}
