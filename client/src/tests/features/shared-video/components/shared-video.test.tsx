import React, { Suspense } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { StateAuthToken } from '../../../../shared/states';
import { VideoService } from '../../../../shared/services';
import { AxiosResponse } from 'axios';
import { ReqCreateVideoDto } from '../../../../shared/dtos';
import SharedVideo from '../../../../features/shared-video/components/shared-video.component';
import '../../../jest.workaround';

describe('Shared Component', () => {
  test('will render shared video component', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot
            initializeState={(snapshot) => snapshot.set(StateAuthToken, '')}
          >
            <Suspense fallback={<div>loading...</div>}>
              <SharedVideo />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const form = screen.getByTestId('share-video-form');
      expect(form).toBeInTheDocument();

      const submitButton = screen.getByTestId('submit-form');
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
              <SharedVideo />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const submitButton = screen.getByTestId('submit-form');
      const urlInput = screen.getByPlaceholderText(/url/i);

      fireEvent.change(urlInput, { target: { value: '' } });

      expect(submitButton).toBeDisabled();
    });
  });

  test('will call api create video upon click on submit button', async () => {
    const mockData: ReqCreateVideoDto = {
      url: 'url',
    };
    const createApi = jest
      .spyOn(VideoService, 'createVideo')
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
              <SharedVideo />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    let submitButton: HTMLElement;
    await waitFor(() => {
      submitButton = screen.getByTestId('submit-form');
      const urlInput = screen.getByPlaceholderText(/url/i);

      fireEvent.change(urlInput, { target: { value: mockData.url } });
    });

    jest.useFakeTimers();
    setTimeout(() => {
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
    });

    setTimeout(() => {
      expect(createApi).toHaveBeenCalledWith(mockData);
    });
  });
});
