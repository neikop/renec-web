import { Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector } from 'reducers/profileSlice';
import { socket } from 'utils/socket';

type Props = {
  children: JSX.Element;
};

const AppHooks = ({ children }: Props) => {
  const { isLoggedIn, id: userId } = useSelector(profileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      socket.connect();
      socket.instance().on('video-create', ({ video }: { video: Video }) => {
        if (userId !== video.createdBy) {
          enqueueSnackbar(
            <div className='max-w-sm'>
              <Typography className='max-line-1 text-sm font-bold text-black'>
                <span className='text-[#1adb1a]'>[NEW]</span> {video?.title}
              </Typography>
              <Typography className='text-sm font-bold' color='textSecondary'>
                {video?.authorName}
              </Typography>
            </div>,
            {
              variant: 'info',
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              autoHideDuration: 10000,
            },
          );
        }
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, userId]);

  return <>{children}</>;
};

export default AppHooks;
