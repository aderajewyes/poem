/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  role?: string;
  @IsString()
  @IsOptional()
  password?: string;
}
