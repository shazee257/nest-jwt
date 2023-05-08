import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getUser(@Request() req) {
    return this.userService.findUser({ _id: req.user.id });
  }

  // update user
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/me')
  updateUser(@Request() req, @Body() body) {
    return this.userService.updateUser(req.user.id, body);
  }
}
