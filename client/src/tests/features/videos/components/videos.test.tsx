import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import Videos from '../../../../features/videos/components/videos.component';
import { VideoService } from '../../../../shared/services';
import { AxiosResponse } from 'axios';
import { ResPagingDto, VideoDto } from '../../../../shared/dtos';
import '../../../jest.workaround';

describe('Videos Component', () => {
  test('will call api when pagination change', async () => {
    const mockData = {
      data: [
        {
          id: 1,
          description: '1',
          url: '1',
          downVote: 1,
          upVote: 1,
          userEmail: '1',
          userId: 1,
        },
      ],
      total: 1,
    } as ResPagingDto<VideoDto>;
    const getListApi = jest
      .spyOn(VideoService, 'getVideosList')
      .mockReturnValue(
        new Promise((resolve) => resolve({ data: mockData } as AxiosResponse)),
      );

    act(() => {
      render(
        <BrowserRouter>
          <RecoilRoot>
            <Suspense fallback={<div>loading...</div>}>
              <Videos />
            </Suspense>
          </RecoilRoot>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      expect(getListApi).toHaveBeenCalled();
    });
  });
});
