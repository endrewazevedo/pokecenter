import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { TransacaoCreateDto } from './dto/transacao-create.dto';

@Injectable()
export class FinancialService {
  async processTransition(data: TransacaoCreateDto) {
    try {
      const req = await axios.post(
        `http://${process.env.FINANCIAL_HOST_NAME}:${process.env.FINANCIAL_HTTP_PORT}/financial/transacao`,
        data,
      );
      return req.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Cliente não encontrado');
      }
      if (error.response && error.response.status === 400) {
        throw new BadRequestException(error.response.data.message);
      }
    }
  }

  async getBalanceById(id: number) {
    try {
      const req = await axios.get(
        `http://${process.env.FINANCIAL_HOST_NAME}:${process.env.FINANCIAL_HTTP_PORT}/financial/saldo/${id}`,
      );
      return req.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Cliente não encontrado');
      }
      if (error.response && error.response.status === 400) {
        throw new BadRequestException(error.response.data.message);
      }
    }
  }

  async getHistoricById(id: number) {
    try {
      const req = await axios.get(
        `http://${process.env.FINANCIAL_HOST_NAME}:${process.env.FINANCIAL_HTTP_PORT}/financial/historico/${id}`,
      );
      return req.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Cliente não encontrado');
      }
      if (error.response && error.response.status === 400) {
        throw new BadRequestException(error.response.data.message);
      }
    }
  }
}
