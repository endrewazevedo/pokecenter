import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}