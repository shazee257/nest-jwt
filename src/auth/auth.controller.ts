import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @UseGuards(AuthGuard('local'))
  getHello(@Request() req): any {
    const token = this.authService.generateToken(req.user);
    return { user: req.user, token };
  }
}
