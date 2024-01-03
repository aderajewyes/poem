/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePoemDto } from './dto/addPoem.dto';
import { UpdatePoemDto } from './dto/updatePoe.dto';
@Injectable()
export class PoemService {
  constructor(private readonly prisma: PrismaService) {}

  async addPoem(userId: number, dto:CreatePoemDto) {
    const result = await this.prisma.poem.create({
      data:{
        title: dto.title,
        body: dto.body,
        user: { connect: {id: userId}}
      }
    });

    return result;
  }

  async fetchPoems(userId: number) {
    const poems = await this.prisma.poem.findMany({
      where: {
        userId,
      }
    })
    return poems;
  }

  async fetchPoem(userId: number,poemId: number) {
    const poem = await this.prisma.poem.findFirst({
      where:{
        userId,
        id: poemId
      }
    });
    return { id: poem.id, title: poem.title, body: poem.body };
  }

  async updatePoem(userId:number,poemId: number, dto:UpdatePoemDto) {
    const updatedPoem = await this.prisma.poem.findUnique({
      where: {
        userId,
        id: poemId
      }
    });
    if(!updatedPoem){
      throw new ForbiddenException('you don\'t have access to the poem')
    }
    await this.prisma.poem.update({
      where: {
        id: poemId,
      },
      data: {
        ...dto
      },
    });
  }

  

  async removePoem(userId: number, poemId: number) {
    const result = await this.prisma.poem.delete({
      where: {
        userId,
        id: poemId,
      },
    });

    if (result.id === 0) {
      throw new NotFoundException("Couldn't find poem");
    }
  }

}
