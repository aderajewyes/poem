/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserModule } from "../user/user.module";
import { jwtGuard } from "./guard/jwt.guard";
import { PassportModule } from "@nestjs/passport";
@Module({
    imports:[PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '20d' },
    }),UserModule],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy, jwtGuard],
    exports:[AuthService,PassportModule]
})

export class AuthModule {}
