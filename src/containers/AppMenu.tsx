import { ArrowDropDown, ArrowRight, Dashboard, ManageAccounts } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { privateRoute } from 'routes';

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 16,
  marginBottom: 8,
  '&.MuiListItemButton-root.Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? '#bbdefb' : '#37474f',
  },
  '&.MuiListItemButton-root:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#90caf9' : '#455a64',
  },
  '.MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 8,
  },
  '.MuiListItemText-primary': {
    fontWeight: 700,
  },
}));

type SubMenuType = {
  name?: string | JSX.Element;
  path: string;
};

type MenuItemProps = {
  icon?: JSX.Element;
  name?: string | JSX.Element;
  path: string;
  items?: SubMenuType[];
};

const MenuItem = ({ icon, name, path, items }: MenuItemProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(location.pathname.startsWith(path));

  const isHome = path === privateRoute.home.path;
  const isContain = location.pathname.startsWith(path);
  const isSelected = isHome ? location.pathname === path : isContain;

  return (
    <>
      {items ? (
        <StyledListItem selected={isContain} onClick={() => setOpen(!open)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{name}</ListItemText>
          {!open ? <ArrowRight /> : <ArrowDropDown />}
        </StyledListItem>
      ) : (
        <Link to={path}>
          <StyledListItem selected={isSelected}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </StyledListItem>
        </Link>
      )}

      {items && (
        <Collapse in={open}>
          <List
            className='ml-6 py-0'
            sx={{
              '.MuiListItemButton-root': { padding: '4px 16px' },
            }}
          >
            {items?.map((sub, index) => (
              <MenuItem key={index} {...sub} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const AppMenu = () => {
  return (
    <List className='flex flex-col'>
      <MenuItem {...privateRoute.home} icon={<Dashboard />} />
      <MenuItem {...privateRoute.profile} icon={<ManageAccounts />} />
    </List>
  );
};

export default AppMenu;
