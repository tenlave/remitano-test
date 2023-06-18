import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { TokenUserInfoDto } from '../../modules/auth/dtos';

export const JwtUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): TokenUserInfoDto => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const bearerToken: string = headers['authorization'];
    const token = bearerToken.replace('Bearer ', '');
    return jwtDecode<TokenUserInfoDto>(token);
  }
);
