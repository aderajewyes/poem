/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { poemService } from './poem.service';

@Controller('poems')
export class PoemController {
    constructor(private readonly poemsService:poemService){}
    // @Post()
    // async addpoem(
    //     @Body('title') poemTitle:string, 
    //     @Body('body') poemBody:string
    //     ) {
    //     const generatedId = await this.poemsService.addPoem(poemTitle,poemBody);
    //     return {id: generatedId}

    // }
    // @Get()
    // async getAllPoems(){
    //     const poems = await this.poemsService.fetchPoems();
    //     return poems;
    // }
    // @Get(':id')
    // getPoem(@Param('id') poemId:string,){
    //     return this.poemsService.fetchPoem(poemId)
    // }
    // @Patch(':id')
    // async updatePoem(
    //     @Param('id') poemId:string,
    //     @Body('title') poemTitle:string, 
    //     @Body('body') poemBody:string
    //     ) {
    //         await this.poemsService.updatepoem(poemId, poemTitle,poemBody)

    //     }
    // @Delete(':id')
    // async deletePoem(@Param('id') poemId:string,){
    //     await this.poemsService.removePoem(poemId);
    //     return 'deleted';
    // }

}