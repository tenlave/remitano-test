import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { throwError } from 'rxjs';
import { AuthDto, SignInSuccessDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: AuthDto): Promise<SignInSuccessDto> {
    return this.authService.signIn(req);
  }

  @Post('signup')
  async signup(@Body() req: AuthDto): Promise<boolean> {
    try {
      return this.authService.signUp(req);
    } catch (e) {
      throwError(e);
    }
  }
}
