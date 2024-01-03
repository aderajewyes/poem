/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class UpdatePoemDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  body?: string;
}
