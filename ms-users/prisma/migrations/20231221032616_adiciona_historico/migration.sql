/*
  Warnings:

  - You are about to alter the column `tipo` on the `Transacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `cpf` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `cpf` VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `Transacao` MODIFY `tipo` ENUM('DEBITO', 'CREDITO') NOT NULL;

-- CreateTable
CREATE TABLE `SaldoHistorico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `dataAlteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SaldoHistorico` ADD CONSTRAINT `SaldoHistorico_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
