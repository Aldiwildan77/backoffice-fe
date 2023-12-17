import { UserProfile } from '../entity/user-profile';

export type GetUserByEmailResponse = {
  data: UserProfile[];
};
