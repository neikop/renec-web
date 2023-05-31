import { Logout } from '@mui/icons-material';
import { AppBar, Avatar, Button, Chip, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileSelector, signOut } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector(profileSelector);

  const handleClickLogout = () => {
    dispatch(signOut());
  };

  return (
    <AppBar position='sticky' elevation={0} className='bg-white'>
      <Toolbar>
        <Link to={privateRoute.home.path}>
          <div className='flex items-center gap-3'>
            <img src={require('assets/icons/Muragi.svg').default} />
            <Typography variant='h4' color='primary'>
              MuiTube
            </Typography>
          </div>
        </Link>
        <div className='flex flex-1 items-center justify-end gap-3'>
          {isLoggedIn ? (
            <>
              <Chip
                className='font-bold'
                label={username}
                avatar={<Avatar src='https://mui.com/static/images/avatar/2.jpg' />}
              />
              <Tooltip title='Logout'>
                <IconButton onClick={handleClickLogout}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Link to={authRoute.login.url}>
                <Button variant='outlined'>Login</Button>
              </Link>
              <Link to={authRoute.register.url}>
                <Button variant='outlined'>Register</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
