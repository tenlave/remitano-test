import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { StateAuthToken } from '../../../../shared/states';
import { UserDto } from '../../../../shared/dtos';
import { UserService } from '../../../../shared/services';
import UserInfo from '../../../../features/layout/components/user-info.component';

describe('UserInfo Component', () => {
  test('will not renders user info and share button', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <UserInfo />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const element = screen.getByTestId('user-info');
      expect(element).toBeInTheDocument();

      const shareButton = screen.queryByText('Share a movie');
      expect(shareButton).toBeNull();

      const welcomeTitle = screen.queryByText('Welcome email');
      expect(welcomeTitle).toBeNull();
    });
  });

  test('can renders user info and share button', async () => {
    const mockData = {
      data: {
        email: 'email',
        name: 'name',
      },
    } as AxiosResponse<UserDto>;
    jest
      .spyOn(UserService, 'getUserInfo')
      .mockReturnValue(new Promise((resolve) => resolve(mockData)));

    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) =>
              snapshot.set(StateAuthToken, 'token')
            }
          >
            <Suspense fallback={<div>loading...</div>}>
              <UserInfo />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const shareButton = screen.getByText('Share a movie');
      expect(shareButton).toBeInTheDocument();

      const welcomeTitle = screen.getByText('Welcome email');
      expect(welcomeTitle).toBeInTheDocument();
    });
  });
});
