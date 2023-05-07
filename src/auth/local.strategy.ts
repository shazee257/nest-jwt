import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException();
    console.log('user', user);

    if (user.password == password)
      return {
        // id: user._id,
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
