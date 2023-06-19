import React, { Suspense } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { StateAuthToken } from '../../../../shared/states';
import Login from '../../../../features/layout/components/login.component';
import { AuthService } from '../../../../shared/services';
import { AxiosResponse } from 'axios';
import { ReqLoginDto } from '../../../../shared/dtos';
import '../../../jest.workaround';

describe('Login Component', () => {
  test('will render login component', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <Login />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const form = screen.getByTestId('login-form');
      expect(form).toBeInTheDocument();

      const submitButton = screen.getByTestId('submit-login-form');
      expect(submitButton).toBeInTheDocument();
    });
  });

  test('will disable submit button if form is invalid', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <Login />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const submitButton = screen.getByTestId('submit-login-form');
      const emailInput = screen.getByPlaceholderText(/Email/i);
      const passwordInput = screen.getByPlaceholderText(/Password/i);

      fireEvent.change(emailInput, { target: { value: 'email' } });
      fireEvent.change(passwordInput, { target: { value: '' } });

      expect(submitButton).toBeDisabled();
    });
  });

  test('will call api login upon click on submit button', async () => {
    const mockData: ReqLoginDto = {
      email: 'email',
      password: 'password',
    };
    const loginApi = jest
      .spyOn(AuthService, 'login')
      .mockReturnValue(
        new Promise((resolve) => resolve({ data: mockData } as AxiosResponse)),
      );

    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <Login />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    let submitButton: HTMLElement;
    await waitFor(() => {
      submitButton = screen.getByTestId('submit-login-form');
      const emailInput = screen.getByPlaceholderText(/Email/i);
      const passwordInput = screen.getByPlaceholderText(/Password/i);

      fireEvent.change(emailInput, { target: { value: mockData.email } });
      fireEvent.change(passwordInput, { target: { value: mockData.password } });
    });

    jest.useFakeTimers();
    setTimeout(() => {
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
    });

    setTimeout(() => {
      expect(loginApi).toHaveBeenCalledWith(mockData);
    });
  });
});
