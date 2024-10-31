import {
  AuthenticateRequest,
  AuthenticateResponse,
} from '../api/interfaces/auth';
import { CreateBetRequest, Bet } from '../api/interfaces/bets';
import { EventsList } from '../api/interfaces/events';
import { ApiResponse, useFetch } from './useFetch';

export const useApi = () => {
  const { get, post, isLoading } = useFetch();

  return {
    isLoading,
    authenticate: async (
      data: AuthenticateRequest,
    ): Promise<ApiResponse<AuthenticateResponse>> => {
      return post('/auth', data);
    },
    getEvents: async (): Promise<ApiResponse<EventsList>> => {
      return get('/events');
    },
    createBet: async (data: CreateBetRequest): Promise<ApiResponse<Bet>> => {
      return post('/bets', data);
    },
  };
};
