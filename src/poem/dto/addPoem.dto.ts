/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePoemDto {
    @IsString()
    @IsNotEmpty()
  title: string;
  @IsString()
    @IsNotEmpty()
  body: string;
}
