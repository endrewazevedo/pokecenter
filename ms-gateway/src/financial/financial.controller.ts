import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransacaoCreateDto } from './dto/transacao-create.dto';

@Controller('financial')
@ApiTags('Transacao')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('/transacao')
  @ApiOperation({
    summary: 'Rota para adicionar transação para o cliente',
    description: 'Rota para adicionar transação para o cliente',
  })
  @ApiResponse({ status: 201 })
  @HttpCode(HttpStatus.CREATED)
  async addTransacao(@Body() transacaoDto: TransacaoCreateDto) {
    return await this.financialService.processTransition(transacaoDto);
  }

  @Get('/saldo/:id')
  @ApiOperation({
    summary: 'Rota para consultar o saldo do cliente',
    description: 'Rota para consultar o saldo do cliente',
  })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async getBalance(@Param('id', ParseIntPipe) id: number) {
    return await this.financialService.getBalanceById(id);
  }

  @Get('historico/:id')
  @ApiOperation({
    summary: 'Rota para consultar o histórico de transações do cliente',
    description: 'Rota para consultar o histórico de transações do cliente',
  })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async getHistoric(@Param('id', ParseIntPipe) id: number) {
    return await this.financialService.getHistoricById(id);
  }
}
