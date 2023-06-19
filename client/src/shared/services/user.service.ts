import { AxiosResponse } from 'axios';
import { http } from './base.service';
import { UserDto } from '../dtos';

export const UserService = {
  getUserInfo: (): Promise<AxiosResponse<UserDto>> => {
    return http.get('/users/current');
  },
};
