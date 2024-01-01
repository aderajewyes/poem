/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticationDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService{
    constructor ( private prisma: PrismaService, private jwt:JwtService, private config: ConfigService) {}
    async login(dto: AuthenticationDto){
        const user = await  this.prisma.user.findUnique({
            where: {
                email:dto.email,
            }
        })
        if(!user){
            throw new ForbiddenException(
                'incorrect credentials try another'
            )
        }
        const passwordMatch = await argon.verify(
            user.hash,dto.password
        )
        if(!passwordMatch){
            throw new ForbiddenException(
                'incorrect credentials try another'
            )
        }
        return this.EnterToken(user.id, user.email);
    }

    async signup(dto: AuthenticationDto) {
        try {
          
          const user = await this.prisma.user.create({
            data: 
            { email: dto.email, hash: await argon.hash(dto.password)},
          });
          return this.EnterToken(user.id,user.email);
        }catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                throw new ForbiddenException(
                    'the data you entered already found try another'
                )}
            }
        }
        throw error;
    
        
    }
    async EnterToken(
        userId: number,
        email:string,
    ):Promise<{accepted_token:string}>{
        const data = {
            sub:userId,
            email,
        }
        const token = await this.jwt.signAsync(data,{
            expiresIn:'1h',
            secret: this.config.get('JWT_SECRET')
        })
        return {
            accepted_token:token,
        }
    }
}