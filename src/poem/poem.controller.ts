/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PoemService } from './poem.service';
import { CreatePoemDto } from './dto/addPoem.dto';
import { jwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdatePoemDto } from './dto/updatePoe.dto';

@UseGuards(jwtGuard)
@Controller('poems')
export class PoemController {
    constructor(private poemsService:PoemService){}
    @Post()
  async addPoem(@Req() req, @Body() createPoemDto: CreatePoemDto) {
    const userId = req.user.id;
    const result = await this.poemsService.addPoem(
      userId, createPoemDto
    );

    return result;
  }
    @Get()
    async getAllPoems(@Req() req){
        const userId = req.user.id;
        const poems = await this.poemsService.fetchPoems(userId);
        return poems;
    }
    @Get(':id')
    getPoem(@Req() req, @Param('id', ParseIntPipe) poemId:number,){
        const userId = req.user.id;

        return this.poemsService.fetchPoem(userId,poemId)
    }
    @Patch(':id')
    async updatePoem(
        @Req() req,
        @Param('id', ParseIntPipe) poemId:number,
        @Body() dto:UpdatePoemDto,
        ) {
            const userId = req.user.id;

            return await this.poemsService.updatePoem(userId,poemId,dto)

        }
    @Delete(':id')
    async deletePoem(@Req() req, @Param('id',ParseIntPipe) poemId:number,){
        const userId = req.user.id;

        return await this.poemsService.removePoem(userId, poemId);
        
    }

}