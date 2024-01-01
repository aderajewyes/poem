/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable,NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// @Injectable()
// export class poemService {
//   constructor (@InjectModel('Poem') private readonly) {}
//   async addPoem(title: string, body: string) {
//     const newPoem = new this.poemmodel({title:title, body:body});
//     const result = await newPoem.save();
//     return result.id as string;

import { Injectable } from "@nestjs/common";

    
//   }
//   async fetchPoems(){
//     const poems = await this.poemmodel.find().exec();
//     return poems.map((poe) => ({id:poe.id, title:poe.title,body:poe.body}));
//   }
//   async fetchPoem(poemid:string){
//     const poem = await this.findPoem(poemid);
//     return {id:poem.id, title:poem.title, body:poem.body};

//   }
//   async updatepoem(poemid: string,title:string,body:string){
//     const updatedPoems = await this.findPoem(poemid);

//     if(title){
//         updatedPoems.title = title;

//     }
//     if(body){
//         updatedPoems.body = body;

//     }
//     updatedPoems.save()
//   }
//   private async findPoem(id:string):Promise<poemModel>{
//     let poem;
//     try{
//       poem = await this.poemmodel.findById(id).exec();

//     } catch (error){
//       throw new NotFoundException('couldn\'t find poem')

//     }
//     if(!poem){
//         throw new NotFoundException('couldn\'t find poem')
//     }
//     return poem;
// }
// async removePoem(poemId:string){
//     const result = await this.poemmodel.deleteOne({_id:poemId}).exec()
//     if(result.deletedCount === 0){
//       throw new NotFoundException('couldn\'t find poem')

//     }

// }
// }


@Injectable()
export class poemService {}
