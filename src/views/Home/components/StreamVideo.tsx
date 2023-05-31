import { Avatar, Box, CardMedia, Container, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { generateDescription, timeAgo } from 'utils/common';

type Props = {
  video: Video;
};

const StreamVideo = ({ video }: Props) => {
  const view = useMemo(() => {
    return Math.floor(Math.random() * 200) + 10;
  }, []);

  const description = useMemo(() => {
    return generateDescription();
  }, []);

  return (
    <Container maxWidth='md' className='flex items-start gap-6'>
      <Box
        component='a'
        href={video.url}
        sx={{
          display: 'inline-block',
          height: '200px',
          minWidth: '40%',
          overflow: 'hidden',
          borderRadius: '8px',
          '&:hover': {
            '.MuiCardMedia-root': {
              transform: 'scale(1.05)',
            },
          },
          '.MuiCardMedia-root': {
            height: 200,
            transformOrigin: '50% 50%',
            transition: 'transform 0.25s ease-in',
          },
          '& iframe': {
            height: 200,
            width: '100%',
          },
        }}
      >
        {video.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: video.html,
            }}
          />
        ) : (
          <CardMedia image={video?.thumbnailUrl.replace('hqdefault.jpg', 'sddefault.jpg')}>
            <div></div>
          </CardMedia>
        )}
      </Box>
      <div className='space-y-2'>
        <Typography component='a' href={video.url} variant='h5' className='max-line-2' title={video.title}>
          {video.title}
        </Typography>

        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9' src={video.thumbnailUrl} />
          <div>
            <Typography component='a' href={video.authorUrl} className='text-sm font-bold' color='textSecondary'>
              {video.authorName}
            </Typography>
            <Typography className='flex gap-2 text-sm font-bold' color='textSecondary'>
              <span>{view}K views</span>
              <span>•</span>
              <span>{timeAgo(DateTime.fromISO(video.createdAt!))}</span>
            </Typography>
          </div>
        </div>

        <div className='text-black/70'>
          <div className='font-bold'>Description:</div>
          <div className='max-line-3 text-sm'>{description}</div>
        </div>
      </div>
    </Container>
  );
};

export default StreamVideo;
