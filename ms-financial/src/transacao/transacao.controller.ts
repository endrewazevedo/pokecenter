import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoCreateDto } from './dto/transacao-create.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('financial')
@ApiTags('Financial')
export class TransacaoController {
  constructor(private readonly financialService: TransacaoService) {}

  @Post('/transacao')
  @ApiOperation({ description: 'Rota para adicionar transação para o cliente' })
  @ApiResponse({ status: 201 })
  @HttpCode(HttpStatus.CREATED)
  async addTransacao(@Body() transacaoDto: TransacaoCreateDto) {
    return await this.financialService.processarTransacao(transacaoDto);
  }

  @Get('historico/:id')
  @ApiOperation({
    description: 'Rota para consultar o histórico de transações do cliente',
  })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  async getHistoric(@Param('id', ParseIntPipe) id: number) {
    return await this.financialService.getHistoricById(id);
  }
}
