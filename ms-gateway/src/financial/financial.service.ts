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
        'http://pokecenter_ms_financial_dev:3002/financial/transacao',
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
}
