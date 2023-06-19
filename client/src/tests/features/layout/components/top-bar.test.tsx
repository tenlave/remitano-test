import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { StateAuthToken } from '../../../../shared/states';
import { UserDto } from '../../../../shared/dtos';
import { UserService } from '../../../../shared/services';
import { AxiosResponse } from 'axios';
import TopBar from '../../../../features/layout/components/top-bar.component';
import '../../../jest.workaround';

describe('TopBar Component', () => {
  test('will render login component if user did not login yet', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <TopBar />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const element = screen.getByTestId('top-bar');
      expect(element).toBeInTheDocument();
    });
  });

  test('will show user info if user have already logged in yet', async () => {
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
              <TopBar />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const element = screen.getByTestId('user-info');
      expect(element).toBeInTheDocument();
    });
  });
});
