import axios from 'axios';
import { apiUrl } from 'config';

export interface GetLatestTransactionsType {
  apiAddress: string;
  address: string;
  contractAddress: string;
  function_name?: string;
  timeout: number;
  page?: number;
  url?: string;
}

export interface TxsResponseFromApi {
  txHash: string,
  gasLimit: string,
  gasPrice: string,
  gasUsed: string,
  miniBlockHash: string,
  nonce: string,
  receiver: string,
  receiverShard: string,
  round: string,
  sender: string,
  senderShard: string,
  signature: string,
  status: string,
  value: string,
  fee: string,
  timestamp: string,
  data: string,
  function: string,
  action: string,
  category: string,
  name: string,
};

const fetchTransactions = (url: string) =>
  async function getTransactions({
    apiAddress,
    address,
    function_name,
    contractAddress,
    timeout,
    page
  }: GetLatestTransactionsType) {
    try {
      const { data } = await axios.get(`${apiAddress}${url}`, {
        params: {
          receiver: contractAddress,
          function: function_name,
          condition: 'must',
          size: page
        },
        timeout
      });

      return {
        data: data,
        success: data !== undefined
      };
    } catch (err) {
      return {
        data: err,
        success: false,
      };
    }
  };


  async function getStats () {
    
      try {
        const { data } = await axios.get(`${apiUrl}/stats`);
        return {
          data: data,
          success: data !== undefined
        };
      } catch (err) {
        return {
          data: err,
          success: false,
        };
      }
  };
  
     


export const getTransactions = fetchTransactions('/transactions');
export const getTransactionsCount = fetchTransactions('/transactions/count');
export  {getStats};
