import { Add } from '@mui/icons-material';
import { CircularProgress, Container, Dialog, Fab, Grid } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteScroll } from 'components';
import { useWindowSize } from 'hooks';
import { enqueueSnackbar } from 'notistack';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { themeSelector } from 'reducers/themeSlice';
import { videoService } from 'services';
import { CardVideo, PopupAddVideo, StreamVideo } from './components';

const Home = () => {
  const { isLoggedIn } = useSelector(profileSelector);
  const { isCard } = useSelector(themeSelector);
  const { isMobile } = useWindowSize();

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
    <Container maxWidth='xl' className='relative py-6'>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <Grid container columnSpacing={3} rowSpacing={{ lg: 5, xs: 3 }}>
          {data?.pages.map(({ items }, index) => (
            <Fragment key={index}>
              {items.map((item) =>
                isCard || isMobile ? (
                  <Grid item key={item._id} lg={3} md={4} sm={6} xs={12}>
                    <CardVideo video={item} detail />
                  </Grid>
                ) : (
                  <Grid item key={item._id} xs={12}>
                    <StreamVideo video={item} />
                  </Grid>
                ),
              )}
            </Fragment>
          ))}
        </Grid>
        <div className='flex justify-center py-6'>{isFetching && <CircularProgress />}</div>
      </InfiniteScroll>

      <Fab
        color='primary'
        className='fixed bottom-3 right-3 md:bottom-10 md:right-10'
        onClick={() => {
          if (isLoggedIn) {
            setOpenAddVideo(true);
          } else {
            enqueueSnackbar('Please login first', { variant: 'warning' });
          }
        }}
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
