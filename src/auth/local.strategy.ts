import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.model';
import { comparePassword } from 'src/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException();

    if (comparePassword(password, user.password))
      return {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        password: user.password,
        role: user.role,
      };
    else
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Password is incorrect',
      });
  }
}
