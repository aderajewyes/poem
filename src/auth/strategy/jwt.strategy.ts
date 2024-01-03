/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config:ConfigService, private prisma:PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(data:{sub:number, email:string}){
    const user = await this.prisma.user.findUnique({
        where: {
            id: data.sub,
        }
    })
    delete user.hash;
    return user;
    
  }
}
