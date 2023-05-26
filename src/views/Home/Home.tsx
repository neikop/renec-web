import { Add } from '@mui/icons-material';
import { CircularProgress, Container, Dialog, Fab, Grid } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteScroll } from 'components';
import { Fragment, useState } from 'react';
import { videoService } from 'services';
import { CardVideo, PopupAddVideo } from './components';

const Home = () => {
  const [openAddVideo, setOpenAddVideo] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['videoService.fetchVideos'],
    ({ pageParam: page }) => videoService.fetchVideos({ page }),
    {
      getNextPageParam: (data) => {
        const { items, page, size } = data;
        if (items.length < size) return undefined;
        return page + 1;
      },
      keepPreviousData: true,
    },
  );

  return (
    <Container maxWidth='xl' className='relative min-h-screen py-6'>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <Grid container columnSpacing={3} rowSpacing={{ lg: 5, xs: 3 }}>
          {data?.pages.map(({ items }, index) => (
            <Fragment key={index}>
              {items.map((item) => (
                <Grid item key={item._id} lg={3} md={4} sm={6} xs={12}>
                  <CardVideo video={item} />
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
        <div className='flex justify-center py-6'>{isFetching && <CircularProgress />}</div>
      </InfiniteScroll>

      <Fab
        color='primary'
        className='fixed bottom-3 right-3 md:bottom-10 md:right-10'
        onClick={() => setOpenAddVideo(true)}
      >
        <Add />
      </Fab>

      <Dialog maxWidth='xs' open={openAddVideo}>
        <PopupAddVideo onClose={() => setOpenAddVideo(false)} />
      </Dialog>
    </Container>
  );
};

export default Home;
