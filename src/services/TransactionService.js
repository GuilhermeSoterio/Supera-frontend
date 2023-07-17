import axios from 'axios';
import api from './api';

class TransactionService {
    async getAlltransactions(nomeOperador, dataInicio, dataFim, page) {
      try {
        const response = await api.post(`/transacao?size=7&page=${page}`, {"nomeOperador": nomeOperador, "initialDate": dataInicio, "endDate": dataFim});
        console.log("Response ", response)
        return response;
      } catch (error) {
        throw new Error('Error fetching datass');
      }
    }
  }

  export default new TransactionService();