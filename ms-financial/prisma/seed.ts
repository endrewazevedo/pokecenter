// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarCliente(nome, telefone, cpf, quantidade) {
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      telefone,
      cpf,
      saldo: {
        create: {
          quantidade,
        },
      },
    },
  });

  console.log('Cliente criado:', cliente);

  return cliente;
}

async function criarTransacao(
  cliente,
  quantidade,
  tipo,
  saldoAntes,
  saldoDepois,
) {
  const transacao = await prisma.transacao.create({
    data: {
      quantidade,
      tipo,
      clienteId: cliente.id,
      saldoAntes,
      saldoDepois,
    },
  });

  console.log('Transação criada:', transacao);

  await prisma.cliente.update({
    where: { id: cliente.id },
    data: {
      saldo: {
        update: {
          quantidade: saldoDepois,
        },
      },
    },
  });

  await prisma.saldoHistorico.create({
    data: {
      quantidade: saldoDepois,
      cliente: {
        connect: {
          id: cliente.id,
        },
      },
      transacao: {
        connect: {
          id: transacao.id,
        },
      },
    },
  });
}

async function main() {
  const cliente1 = await criarCliente(
    'Maycon',
    '11111111',
    '11345678901',
    1000,
  );
  const cliente2 = await criarCliente(
    'Jorge',
    '222222222',
    '21456789012',
    1500,
  );
  const cliente3 = await criarCliente(
    'Vitor',
    '333333333',
    '31567890123',
    2000,
  );

  const transacoesCliente2 = [
    {
      quantidade: 300,
      tipo: 'DEBITO',
      saldoAntes: 1500,
      saldoDepois: 1200,
    },
    {
      quantidade: 200,
      tipo: 'CREDITO',
      saldoAntes: 1200,
      saldoDepois: 1400,
    },
    {
      quantidade: 100,
      tipo: 'DEBITO',
      saldoAntes: 1400,
      saldoDepois: 1300,
    },
  ];

  const transacaoCliente3 = [
    {
      quantidade: 500,
      tipo: 'CREDITO',
      saldoAntes: 0,
      saldoDepois: 500,
    },
  ];

  for (const transacao of transacoesCliente2) {
    await criarTransacao(
      cliente2,
      transacao.quantidade,
      transacao.tipo,
      transacao.saldoAntes,
      transacao.saldoDepois,
    );
  }

  for (const transacao of transacaoCliente3) {
    await criarTransacao(
      cliente3,
      transacao.quantidade,
      transacao.tipo,
      transacao.saldoAntes,
      transacao.saldoDepois,
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
