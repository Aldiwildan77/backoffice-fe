import { AxiosError } from 'axios';
import { server } from './server';

export const checkIn = async (email: string) => {
  try {
    const response = await server.post('/api/users/check-in', { email });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.data;
  }
};
