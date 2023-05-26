import { Add } from '@mui/icons-material';
import { Container, Dialog, Fab } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from 'hooks';
import { useState } from 'react';
import { videoService } from 'services';
import { PopupAddVideo } from './components';

const Home = () => {
  const { dataSearch, onPaginationChange } = useSearch();
  const [openAddVideo, setOpenAddVideo] = useState(false);

  const { data, isFetching, refetch } = useQuery(
    ['videoService.fetchVideos', dataSearch],
    () => videoService.fetchVideos(dataSearch),
    { keepPreviousData: true },
  );

  return (
    <Container maxWidth='xl' className='relative min-h-screen py-6'>
      <Fab color='primary' className='absolute bottom-6 right-6' onClick={() => setOpenAddVideo(true)}>
        <Add />
      </Fab>

      <Dialog maxWidth='xs' open={openAddVideo}>
        <PopupAddVideo onClose={() => setOpenAddVideo(false)} />
      </Dialog>
    </Container>
  );
};

export default Home;
