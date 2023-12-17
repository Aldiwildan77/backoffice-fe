import { AxiosError } from 'axios';
import { server } from './server';

export const bulkSeatTable = async (file: File) => {
  try {
    console.log(file);
    const { data: resp } = await server.putForm('/api/users/seat-tables', {
      file,
    });
    return resp;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
