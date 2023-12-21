import { ApiProperty } from '@nestjs/swagger';

export class CustomerClienteDto {
  @ApiProperty({ required: true })
  nome: string;

  @ApiProperty({ required: true })
  telefone: string;

  @ApiProperty({ required: true })
  cpf: string;
}
