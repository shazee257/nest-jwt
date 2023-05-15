import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from 'src/users/model/user.model';
import { comparePassword } from 'src/utils';
import { UserService } from 'src/users/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<User> {
    const body: any = req.body;
    if (!body.fcmToken)
      throw new HttpException('fcmToken is required', HttpStatus.BAD_REQUEST);

    const user: User = await this.userService.findUser({ email });
    if (!user) throw new UnauthorizedException();

    // password verify
    const passwordMatch = comparePassword(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Password is incorrect',
      });

    // update fcm token
    const updateUser = this.userService.updateFcm(user.id, body.fcmToken);
    if (!updateUser)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return updateUser;
  }
}
