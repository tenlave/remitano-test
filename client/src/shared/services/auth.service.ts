import { AxiosResponse } from 'axios';
import { http } from './base.service';
import { ReqLoginDto, ResLoginDto } from '../dtos';

export const AuthService = {
  login: (body: ReqLoginDto): Promise<AxiosResponse<ResLoginDto>> => {
    return http.post('/auth/login', body);
  }
}
