import { atom, selector } from 'recoil';
import { UserDto } from '../dtos';
import { UserService } from '../services';

export const StateAuthToken = atom<string>({
  key: 'AuthenState_Token',
  default: ''
})

export const StateUser = atom<UserDto | null>({
  key: 'AuthenState_User',
  default: null
})

export const StateLoggedInUserInfo = selector<UserDto | null>({
  key: 'AuthenState_LoggedInUserInfo',
  get: async ({ get }) => {
    const authToken = get(StateAuthToken);
    if (!authToken.length) {
      return null;
    }
    const res = await UserService.getUserInfo();
    return res.data
  },
});

