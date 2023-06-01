import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { videoService } from 'services';

test('Just check App can render with no error', async () => {
  const paginateVideos: PaginateResponse<Video> = { items: [], total: 0, page: 1, size: 10 };
  jest.spyOn(videoService, 'fetchVideos').mockResolvedValue(paginateVideos);

  render(<App />);
  expect(screen.getByText('MuiTube')).toBeInTheDocument();
});

describe('App', () => {
  it('should render stream mode by default', async () => {
    const video: Video = {
      _id: '1',
      url: 'https://youtube.com/watch?v=123456',
      title: 'YouTube Video',
      authorName: 'Author',
      authorUrl: 'https://youtube.com/@author',
      thumbnailUrl: 'https://example/com/picture.png',
      html: `<iframe title="YouTube embed"></iframe>`,
      createdAt: '2023-06-01T09:01:43.766Z',
      createdBy: 'createdBy',
    };
    const paginateVideos: PaginateResponse<Video> = { items: [video], total: 1, page: 1, size: 10 };
    jest.spyOn(videoService, 'fetchVideos').mockResolvedValue(paginateVideos);

    const { container } = render(<App />);

    await waitFor(() => {
      expect(videoService.fetchVideos).toHaveBeenCalledTimes(1);
      expect(screen.getByText(video.title)).toBeInTheDocument();
      expect(screen.getByText(video.authorName)).toBeInTheDocument();
      expect(container.getElementsByTagName('iframe').length).toBe(1);
    });
  });

  it('can switch between modes', async () => {
    const video: Video = {
      _id: '1',
      url: 'https://youtube.com/watch?v=123456',
      title: 'YouTube Video',
      authorName: 'Author',
      authorUrl: 'https://youtube.com/@author',
      thumbnailUrl: 'https://example/com/picture.png',
      html: `<iframe title="YouTube embed"></iframe>`,
      createdAt: '2023-06-01T09:01:43.766Z',
      createdBy: 'createdBy',
    };
    const paginateVideos: PaginateResponse<Video> = { items: [video], total: 1, page: 1, size: 10 };
    jest.spyOn(videoService, 'fetchVideos').mockResolvedValue(paginateVideos);

    const { container } = render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'card' }));
    await waitFor(() => {
      expect(container.getElementsByClassName('MuiCardMedia-root').length).toBe(1);
    });

    fireEvent.click(screen.getByRole('button', { name: 'stream' }));
    await waitFor(() => {
      expect(container.getElementsByClassName('MuiCardMedia-root').length).toBe(0);
    });
  });
});
