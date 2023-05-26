import { Home } from '@mui/icons-material';
import { Breadcrumbs, IconButton, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { privateRoute } from 'routes';

const Breadcrumb = () => {
  const location = useLocation();

  const routes = (location.pathname.match(/\/[\w-]*/g) ?? [])
    .map((_, index, array) => array.slice(0, index + 1).join(''))
    .map((item) => Object.values(privateRoute).find((route) => item === route.path))
    .filter((item) => item?.name);

  return (
    <Breadcrumbs>
      <Link to={privateRoute.home.path}>
        <IconButton>
          <Home color='primary' />
        </IconButton>
      </Link>
      {routes.map((item, index) => (
        <Typography variant='h4' color='primary' key={index}>
          {item?.name}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
