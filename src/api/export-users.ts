import { AxiosError } from 'axios';
import { server } from './server';

export const getUsersExport = async () => {
  try {
    const { data: resp } = await server.get('/api/users/export');
    return resp;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
