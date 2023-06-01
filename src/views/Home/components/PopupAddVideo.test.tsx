import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from 'containers';
import { videoService } from 'services';
import { PopupAddVideo } from '.';

describe('PopupAddVideo', () => {
  const video: Video = {
    _id: '1',
    url: 'https://youtube.com/watch?v=123456',
    title: 'YouTube Video',
    authorName: 'Author',
    authorUrl: 'https://youtube.com/@author',
    thumbnailUrl: 'https://example/com/picture.png',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
  };

  it('should render with no error', async () => {
    render(<PopupAddVideo onClose={() => {}} />, { wrapper: AppProvider });
    expect(screen.getByText('Add YouTube Video')).toBeInTheDocument();
  });

  it('should check form validator', async () => {
    render(<PopupAddVideo onClose={() => {}} />, { wrapper: AppProvider });

    jest.spyOn(videoService, 'createVideo').mockResolvedValueOnce(video);

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(screen.getByText('YouTube Video URL is required')).toBeInTheDocument();
      expect(videoService.createVideo).toHaveBeenCalledTimes(0);
    });
  });

  it('should check video info correctly', async () => {
    render(<PopupAddVideo onClose={() => {}} />, { wrapper: AppProvider });

    jest.spyOn(videoService, 'getVideoInfo').mockRejectedValueOnce('Expected error message');

    fireEvent.change(screen.getByLabelText('URL *'), { target: { value: video.url } });

    await waitFor(() => {
      expect(videoService.getVideoInfo).toHaveBeenCalledTimes(1);
      expect(videoService.getVideoInfo).toBeCalledWith({ format: 'json', url: video.url });
    });
  });

  it('should call createVideo', async () => {
    render(<PopupAddVideo onClose={() => {}} />, { wrapper: AppProvider });

    jest.spyOn(videoService, 'getVideoInfo').mockResolvedValueOnce(video);
    jest.spyOn(videoService, 'createVideo').mockResolvedValueOnce(video);

    fireEvent.change(screen.getByLabelText('URL *'), { target: { value: video.url } });

    await waitFor(() => {
      expect(videoService.getVideoInfo).toHaveBeenCalledTimes(1);
      expect(videoService.getVideoInfo).toBeCalledWith({ format: 'json', url: video.url });
    });

    await waitFor(() => {
      expect(screen.getByText(video.title)).toBeInTheDocument();
      expect(screen.getByText(video.authorName)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(videoService.createVideo).toHaveBeenCalledTimes(1);
      expect(videoService.createVideo).toHaveBeenCalledWith({ ...video });
    });
  });
});
