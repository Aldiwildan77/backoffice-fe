import { AxiosError } from 'axios';
import { GetUsersResponse } from '../interface/api/get-users';
import { server } from './server';

export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  email?: string
): Promise<GetUsersResponse> => {
  try {
    let path = '/api/users';

    const query = new URLSearchParams();
    if (email) {
      query.append('email', email);
    }
    query.append('page', page.toString());
    query.append('limit', limit.toString());

    path = `${path}?${query}`;

    const { data: resp } = await server.get<GetUsersResponse>(path);
    return resp;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
