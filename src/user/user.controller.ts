/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { jwtGuard } from 'src/auth/guard/jwt.guard';
@Controller('users')
@UseGuards(jwtGuard)

export class UserController {
  @Get('admin')
  getAdmin(@GetUser() user: User) {
    return user;
  }
  @Patch()
  updateUser() {}
}
