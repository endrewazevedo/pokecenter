import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { CreateClienteDto } from './dto/cliente-create.dto';

@Injectable()
export class UsersService {
  async getClientById(id: number) {
    try {
      const client = await axios.get(
        `http://pokecenter_ms_users_dev:3001/users/${id}`,
      );

      return client.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(error.response.data.message);
      }
      throw error;
    }
  }

  async createClient(data: CreateClienteDto) {
    try {
      const client = await axios.post(
        `http://pokecenter_ms_users_dev:3001/users`,
        data,
      );

      return client.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new BadRequestException(error.response.data.message);
      }
    }
  }
}
