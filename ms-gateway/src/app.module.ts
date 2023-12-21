import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [UsersModule, FinancialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
