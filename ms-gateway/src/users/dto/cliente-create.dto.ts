import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ required: true })
  nome: string;

  @ApiProperty({ required: true })
  telefone: string;
}
