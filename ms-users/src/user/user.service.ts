import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CustomerClienteDto } from './dto/customer-create.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getCustomers() {
    const customers = await this.prisma.cliente.findMany({
      include: { saldo: true },
    });
    return customers.map((client) => ({
      id: client.id,
      saldo: client.saldo.quantidade,
      nome: client.nome,
      telefone: client.telefone,
      cpf: client.cpf,
    }));
  }

  async createCustomer(data: CustomerClienteDto) {
    if (!data.nome || !data.telefone || !data.cpf) {
      throw new BadRequestException('Nome, telefone e CPF são obrigatórios.');
    }
    if (data.cpf.length !== 11) {
      throw new BadRequestException('CPF deve ter 11 dígitos.');
    }

    const customer = await this.prisma.cliente.findFirst({
      where: { cpf: data.cpf },
    });

    if (customer) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    const saldoInicial = 0;
    await this.prisma.cliente.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        saldo: { create: { quantidade: saldoInicial } },
      },
    });
  }

  async getCustomerById(id: number) {
    const customerInfo = await this.prisma.cliente.findUnique({
      where: { id },
      include: { saldo: true },
    });

    if (!customerInfo) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return {
      id: customerInfo.id,
      saldo: customerInfo.saldo.quantidade,
      nome: customerInfo.nome,
      telefone: customerInfo.telefone,
    };
  }
  async getCustomerByFilter(query: CustomerQueryDto) {
    const { name, cpf } = query;
    const where =
      name || cpf
        ? { OR: [{ nome: { contains: name } }, { cpf: { equals: cpf } }] }
        : {};

    const customerInfo = await this.prisma.cliente.findMany({
      where,
      include: { saldo: true },
    });

    return customerInfo.map((clientInfo) => ({
      id: clientInfo.id,
      saldo: clientInfo.saldo.quantidade,
      nome: clientInfo.nome,
      telefone: clientInfo.telefone,
      cpf: clientInfo.cpf,
    }));
  }
}
