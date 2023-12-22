import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerClienteDto } from './dto/customer-create.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CustomerQueryDto } from './dto/customer-query.dto';

@Controller('users')
@ApiTags('Cliente')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ description: 'Rota para criar clientes' })
  @ApiResponse({ status: 201 })
  async createCliente(@Body() data: CustomerClienteDto) {
    return await this.userService.createCustomer(data);
  }

  @Get(':id')
  @ApiOperation({ description: 'Rota para listar cliente por id' })
  @ApiResponse({ status: 200, type: CustomerResponseDto })
  async getCliente(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getCustomerById(id);
  }

  @Get()
  @ApiOperation({ description: 'Rota para buscar cliente por filtro' })
  @ApiResponse({ status: 200 })
  async getCustomerByFilter(@Query() query: CustomerQueryDto) {
    return await this.userService.getCustomerByFilter(query);
  }
}
