/*
  Warnings:

  - Added the required column `transacaoId` to the `SaldoHistorico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldoAntes` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldoDepois` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SaldoHistorico` ADD COLUMN `transacaoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transacao` ADD COLUMN `dataTransacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `saldoAntes` INTEGER NOT NULL,
    ADD COLUMN `saldoDepois` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SaldoHistorico` ADD CONSTRAINT `SaldoHistorico_transacaoId_fkey` FOREIGN KEY (`transacaoId`) REFERENCES `Transacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
