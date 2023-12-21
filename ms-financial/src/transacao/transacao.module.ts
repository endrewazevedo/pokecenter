import { Module } from '@nestjs/common';
import { TransacaoController } from './transacao.controller';
import { TransacaoService } from './transacao.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService, PrismaService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
