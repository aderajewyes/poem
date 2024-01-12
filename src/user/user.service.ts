import { Injectable } from '@nestjs/common';
import { UpdateUser } from './dto/updateUser.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async UpdateUser(userId: number, dto: UpdateUser) {
    const client = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    return client;
  }
}
