import { AxiosError } from 'axios';
import { BulkSeatTableResponse } from '../interface/api/bulk-seat-table';
import { server } from './server';

export const bulkSeatTable = async (file: File) => {
  try {
    const { data: resp } = await server.putForm<BulkSeatTableResponse>(
      '/api/users/seat-tables',
      {
        file,
      },
    );
    return resp;
  } catch (error) {
    const err = error as AxiosError<BulkSeatTableResponse>;
    throw err.response?.data || err;
  }
};
