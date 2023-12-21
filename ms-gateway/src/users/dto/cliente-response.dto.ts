import { ApiProperty } from '@nestjs/swagger';

export class ClienteResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly saldo: string;

  @ApiProperty()
  readonly nome: string;

  @ApiProperty()
  readonly telefone: string;
}
