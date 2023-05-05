import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'user1',
      password: 'secret1',
      email: 'user1@gmail.com',
    },
    {
      username: 'user2',
      password: 'secret2',
      email: 'user2@gmail.com',
    },
  ];

  getUserByName(userName: string): User {
    return this.users.find((user) => user.username === userName);
  }
}
