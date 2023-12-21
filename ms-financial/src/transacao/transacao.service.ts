import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TransacaoCreateDto } from './dto/transacao-create.dto';
import { TipoTransacao } from './utils/transacao.enum';

@Injectable()
export class TransacaoService {
  constructor(private prisma: PrismaService) {}

  async processarTransacao(data: TransacaoCreateDto) {
    const { valor, tipo, id_cliente } = data;

    if (valor <= 0) {
      throw new BadRequestException('Valor inválido');
    }

    if (!valor) {
      throw new BadRequestException('Valor não informado');
    }

    const cliente = await this.prisma.cliente.findUnique({
      where: { id: data.id_cliente },
      include: { saldo: true },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    if (tipo === TipoTransacao.Debito && cliente.saldo.quantidade < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    if (tipo !== TipoTransacao.Debito && tipo !== TipoTransacao.Credito) {
      throw new BadRequestException('Tipo de transação inválido');
    }

    const quantidade = tipo === TipoTransacao.Debito ? -valor : valor;
    const novoSaldo = cliente.saldo.quantidade + quantidade;

    await this.prisma.cliente.update({
      where: { id: data.id_cliente },
      data: {
        saldo: {
          update: { quantidade: novoSaldo },
        },
      },
    });

    const transacao = await this.prisma.transacao.create({
      data: {
        quantidade,
        tipo,
        clienteId: id_cliente,
        dataTransacao: new Date(),
        saldoAntes: cliente.saldo.quantidade,
        saldoDepois: novoSaldo,
      },
    });

    await this.prisma.saldoHistorico.create({
      data: {
        quantidade: novoSaldo,
        clienteId: id_cliente,
        transacaoId: transacao.id,
      },
    });

    return transacao;
  }

  async getHistoricById(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { saldo: true },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const historico = await this.prisma.saldoHistorico.findMany({
      where: { clienteId: id },
      include: { transacao: true },
    });

    return { cliente, historico };
  }
}
