import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransacaoCreateDto } from './dto/transacao-create.dto';

@Controller('financial')
@ApiTags('Transacao')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('/transacao')
  @ApiOperation({ description: 'Rota para adicionar transação para o cliente' })
  @ApiResponse({ status: 201 })
  @HttpCode(HttpStatus.CREATED)
  async addTransacao(@Body() transacaoDto: TransacaoCreateDto) {
    return await this.financialService.processTransition(transacaoDto);
  }
}
