import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { AppProvider } from 'containers';
import { videoService } from 'services';
import { Home } from '.';

describe('Home', () => {
  it('should render with no error', async () => {
    const paginateVideos: PaginateResponse<Video> = { items: [], total: 0, page: 1, size: 10 };
    jest.spyOn(videoService, 'fetchVideos').mockResolvedValue(paginateVideos);

    render(<Home />, { wrapper: AppProvider });

    await waitFor(() => {
      expect(videoService.fetchVideos).toHaveBeenCalledTimes(1);
    });
  });
});
