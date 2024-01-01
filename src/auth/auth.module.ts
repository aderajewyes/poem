/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtStrategy } from "./strategy/jwt.strategy";
@Module({
    imports:[PrismaModule,JwtModule.register({})],
    controllers:[AuthController],
    providers:[AuthService,jwtStrategy]
})

export class AuthModule {}
