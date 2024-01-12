/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePoemDto } from './dto/addPoem.dto';
import { UpdatePoemDto } from './dto/updatePoe.dto';
@Injectable()
export class PoemService {
  constructor(private readonly prisma: PrismaService) {}
  async addPoem(dto:CreatePoemDto) {
    const result = await this.prisma.poem.create({
      data:{
        title: dto.title,
        body: dto.body,
      }
    });

    return result;
  }

  async fetchPoems() {
    const poems = await this.prisma.poem.findMany({
      
    })
    return poems;
  }

  async fetchPoem(poemId: number) {
    const poem = await this.prisma.poem.findFirst({
      where:{
        id: poemId
      }
    });
    return { id: poem.id, title: poem.title, body: poem.body };
  }

  async updatePoem(poemId: number, dto:UpdatePoemDto) {
    const updatedPoem = await this.prisma.poem.findUnique({
      where: {
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

  

  async removePoem(poemId: number) {
    const result = await this.prisma.poem.delete({
      where: {
        id: poemId,
      },
    });

    if (result.id === 0) {
      throw new NotFoundException("Couldn't find poem");
    }
  }

}
