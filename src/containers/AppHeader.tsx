import { Logout } from '@mui/icons-material';
import { AppBar, Avatar, Chip, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from 'reducers/profileSlice';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(profileSelector);

  const handleClickLogout = () => {
    dispatch(signOut());
  };

  return (
    <AppBar position='sticky' elevation={0} className='bg-white'>
      <Toolbar>
        <div className='flex items-center gap-3'>
          <img src={require('assets/icons/Muragi.svg').default} />
          <Typography variant='h4' color='primary'>
            MuiTube
          </Typography>
        </div>
        <div className='flex flex-1 items-center justify-end gap-3'>
          <Chip className='font-bold' label={username} avatar={<Avatar>M</Avatar>} />
          <Tooltip title='Logout'>
            <IconButton onClick={handleClickLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
