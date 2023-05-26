import { Avatar, Box, Card, CardMedia, Typography } from '@mui/material';

type Props = {
  video?: Video;
};

const CardVideo = ({ video }: Props) => {
  return (
    <Card elevation={0}>
      <Box
        component='a'
        href={video?.url}
        sx={{
          display: 'block',
          height: '200px',
          overflow: 'hidden',
          borderRadius: '16px',
          borderBottomWidth: 1,
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
        }}
      >
        <CardMedia image={video?.thumbnailUrl.replace('hqdefault.jpg', 'sddefault.jpg')}>
          <div></div>
        </CardMedia>
      </Box>
      <div className='flex gap-3 py-3'>
        <Avatar className='h-9 w-9' src={video?.thumbnailUrl} />
        <div className='min-h-[48px]'>
          <Typography component='a' href={video?.url} variant='h6' className='max-line-2' title={video?.title}>
            {video?.title}
          </Typography>
          <Typography component='a' href={video?.authorUrl} className='text-sm font-bold' color='textSecondary'>
            {video?.authorName}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default CardVideo;
