import { Injectable } from '@nestjs/common';
import { UpdatePoemDto } from 'src/poem/dto/updatePoe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async UpdateUser(userId: number, dto: UpdatePoemDto) {
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
