import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @UseGuards(AuthGuard('local'))
  getHello(@Request() req): any {
    const token = this.authService.generateToken(req.user);

    return { user: req.user, token };
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(): any {
    return 'req.user';
  }
}
