import { Avatar, Card, CardMedia, Typography } from '@mui/material';

type Props = {
  videoInfo?: VideoInfo;
};

const CardVideo = ({ videoInfo }: Props) => {
  return (
    <Card>
      <CardMedia
        image={videoInfo?.thumbnailUrl.replace('hqdefault.jpg', 'sddefault.jpg')}
        className='h-[298px] border-b'
      >
        <div></div>
      </CardMedia>
      <div className='flex gap-2 p-3'>
        <Avatar />
        <div className='min-h-[48px]'>
          <Typography variant='h6' className='max-line-2 mb-1'>
            {videoInfo?.title}
          </Typography>
          <Typography component='a' href={videoInfo?.authorUrl} className='hover:text-primary-main'>
            {videoInfo?.authorName}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default CardVideo;
