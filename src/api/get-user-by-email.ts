import { AxiosError } from 'axios';
import type { GetUserByEmailResponse } from '../interface/api/get-user-by-email';
import { server } from './server';

export const getUserByEmail = async (email: string) => {
  try {
    const { data: resp } = await server.get<GetUserByEmailResponse>(
      `/api/users?email=${email}&page=1&limit=1`
    );
    return resp.data[0];
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.data;
  }
};
