import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly saldo: string;

  @ApiProperty()
  readonly nome: string;

  @ApiProperty()
  readonly telefone: string;

  @ApiProperty()
  readonly cpf: string;
}
