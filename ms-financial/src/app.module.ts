import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [TransacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
