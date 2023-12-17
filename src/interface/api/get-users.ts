import { Pagination } from '../entity/pagination';
import { UserProfile } from '../entity/user-profile';

export type GetUsersResponse = {
  data: UserProfile[];
  meta: Pagination;
};
