import { AxiosError } from 'axios';
import { server } from './server';

export const setSeatTable = async (email: string, seat_table: string) => {
  try {
    const response = await server.put('/api/users/seat-table', {
      email,
      seat_table,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.data;
  }
};
