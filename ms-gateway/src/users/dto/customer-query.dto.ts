import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CustomerQueryDto {
  @ApiProperty({ required: false, description: 'Nome do cliente' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'CPF do cliente' })
  @IsOptional()
  @IsString()
  cpf?: string;
}
