import { Logout } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, signOut } from 'reducers/profileSlice';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(profileSelector);

  const handleClickLogout = () => {
    dispatch(signOut());
  };

  return (
    <Toolbar className='fixed right-0 z-10 gap-3'>
      <Chip className='font-bold' label={username} avatar={<Avatar>M</Avatar>} />
      <IconButton onClick={handleClickLogout}>
        <Logout />
      </IconButton>
    </Toolbar>
  );
};

export default AppHeader;
