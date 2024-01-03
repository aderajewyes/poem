import { Get, Body, Controller, Patch, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { jwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { UpdatePoemDto } from 'src/poem/dto/updatePoe.dto';
import { User } from '@prisma/client';
@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private clientService: UserService) {}
  @Get('poet')
  getPoeter(@GetUser() client: User) {
    return client;
  }
  @Patch()
  UpdateUser(@GetUser('id') userId: number, @Body() dto: UpdatePoemDto) {
    return this.clientService.UpdateUser(userId, dto);
  }
}
