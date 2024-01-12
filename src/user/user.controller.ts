import { Get, Body, Controller, Patch, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { jwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { UpdateUser } from './dto/updateUser.dto';
@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private clientService: UserService) {}
  @Get('poet')
  getPoeter(@GetUser() client: User) {
    return client;
  }
  @Patch()
  UpdateUser(@GetUser('id') userId: number, @Body() dto: UpdateUser) {
    return this.clientService.UpdateUser(userId, dto);
  }
}
