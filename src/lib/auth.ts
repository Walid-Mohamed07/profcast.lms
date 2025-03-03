import { User } from '@/models/user';
import { getCookie } from 'cookies-next';

export const getCurrentUser = () => {
  const user = getCookie('user');
  if (user) {
    return JSON.parse(user as string) as User;
  }
};
