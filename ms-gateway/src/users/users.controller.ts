import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClienteDto } from './dto/cliente-create.dto';

@Controller('users')
@ApiTags('Cliente')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Rota para criar clientes' })
  async createClient(@Body() data: CreateClienteDto) {
    return await this.usersService.createClient(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  async findOne(@Param('id') id: number) {
    return await this.usersService.getClientById(id);
  }
}
