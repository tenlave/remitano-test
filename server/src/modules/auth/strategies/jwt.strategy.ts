import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { ENV_CONST } from '../../../shared/consts';
import { CACHE_CONST } from '../../../shared/consts/cache.const';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env[ENV_CONST.JWT_SEC],
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const bearerToken: string = request.headers['authorization'];
    const token = bearerToken.replace('Bearer ', '');
    const blacklistToken = await this.cacheManager.get(CACHE_CONST.BLACKLIST_TOKEN + token);
    if (blacklistToken) {
      throw new UnauthorizedException('Token expired');
    }

    return { userId: payload.sub, username: payload.username };
  }
}
