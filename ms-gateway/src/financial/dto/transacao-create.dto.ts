import { ApiProperty } from '@nestjs/swagger';

export class TransacaoCreateDto {
  @ApiProperty({ description: 'ID do cliente' })
  id_cliente: number;

  @ApiProperty({ description: 'Valor da transação' })
  valor: number;

  @ApiProperty({ description: 'Tipo da transação (debito/credito)' })
  tipo: string;
}
