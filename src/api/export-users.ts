import { AxiosError } from 'axios';
import { server } from './server';

export const getUsersExport = async () => {
  try {
    const { data: resp } = await server.get('/api/users/export');

    // download the csv response
    const element = document.createElement('a');
    const file = new Blob([resp], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'users.csv';
    document.body.appendChild(element);
    element.click();

    return resp;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
