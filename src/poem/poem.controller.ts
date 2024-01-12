/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,UseGuards } from '@nestjs/common';
import { PoemService } from './poem.service';
import { CreatePoemDto } from './dto/addPoem.dto';
import { jwtGuard } from '../auth/guard/jwt.guard';
import { UpdatePoemDto } from './dto/updatePoe.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@UseGuards(jwtGuard,RolesGuard)
@Controller('poems')
export class PoemController {
  constructor(private poemsService:PoemService){}
  @Post()
@Roles('admin')
  async addPoem(@Body() createPoemDto: CreatePoemDto) {
    const result = await this.poemsService.addPoem(
      createPoemDto
    );

    return result;
  }
    @Get()

    async getAllPoems(){
        const poems = await this.poemsService.fetchPoems();
        return poems;
    }
    @Get(':id')

    getPoem(@Param('id', ParseIntPipe) poemId:number,){

        return this.poemsService.fetchPoem(poemId)
    }
    @Patch(':id')

    async updatePoem(
        @Param('id', ParseIntPipe) poemId:number,
        @Body() dto:UpdatePoemDto,
        ) {

            return await this.poemsService.updatePoem(poemId,dto)

        }
    @Delete(':id')

    async deletePoem(@Param('id',ParseIntPipe) poemId:number,){

        return await this.poemsService.removePoem(poemId);
        
    }

}