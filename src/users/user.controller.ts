import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getUser(@Request() req) {
    return this.userService.findUser({ _id: req.user.id });
  }

  @Put('/update/me')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    
    return this.userService.updateUser(req.user.id, updateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findUser(@Param() req) {
    return this.userService.findUser({ _id: req.id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/users/',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
        },
      }),
      fileFilter: (req, file, cb) => {
        // mine type validation
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadImage(@Request() req, @UploadedFile() file) {
    return this.userService.uploadImage(req.user.id, file.filename);
  }
}
