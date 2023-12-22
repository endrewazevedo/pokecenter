import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { CustomerClienteDto } from './dto/customer-create.dto';

@Controller('users')
@ApiTags('Cliente')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Rota para criar clientes',
    description: 'Rota para criar clientes',
  })
  async createClient(@Body() data: CustomerClienteDto) {
    return await this.usersService.createCustomer(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Rota para buscar cliente por filtro',
    description: 'Rota para buscar cliente por filtro',
  })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  async getCustomerByFilter(@Query() query: CustomerQueryDto) {
    return await this.usersService.getCustomerByFilter(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Rota que busca cliente por id',
    description: 'Rota que busca cliente por id',
  })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  async getCliente(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getCustomerById(id);
  }
}
