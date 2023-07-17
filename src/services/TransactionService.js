import axios from 'axios';
import api from './api';

class TransactionService {
    async getAlltransactions(nomeOperador, dataInicio, dataFim, page) {
      try {
        const response = await api.post(`/transacao?size=7&page=${page}`, {"nomeOperador": nomeOperador, "initialDate": dataInicio, "endDate": dataFim});
        return response;
      } catch (error) {
        throw new Error('Error fetching datas');
      }
    }
  }

  export default new TransactionService();