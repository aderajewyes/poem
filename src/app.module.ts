import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PoemModule } from './poem/poem.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AuthModule,
    PoemModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
