import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { CustomerQueryDto } from './dto/customer-query.dto';
import { CustomerClienteDto } from './dto/customer-create.dto';

@Injectable()
export class UsersService {
  async getCustomerById(id: number) {
    try {
      const client = await axios.get(
        `http://${process.env.USERS_HOST_NAME}:${process.env.USERS_HTTP_PORT}/users/${id}`,
      );

      return client.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(error.response.data.message);
      }
      throw error;
    }
  }

  async createCustomer(data: CustomerClienteDto) {
    try {
      const client = await axios.post(
        `http://${process.env.USERS_HOST_NAME}:${process.env.USERS_HTTP_PORT}/users/create`,
        data,
      );

      return client.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new BadRequestException(error.response.data.message);
      }
      if (error.response && error.response.status === 400) {
        throw new BadRequestException(error.response.data.message);
      }
    }
  }

  async getCustomerByFilter(query: CustomerQueryDto) {
    try {
      const client = await axios.get(
        `http://${process.env.USERS_HOST_NAME}:${process.env.USERS_HTTP_PORT}/users?${query}`,
      );

      return client.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(error.response.data.message);
      }
      throw error;
    }
  }
}
