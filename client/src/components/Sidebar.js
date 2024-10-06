import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import CompareIcon from '@mui/icons-material/Compare';
import SchoolIcon from '@mui/icons-material/School';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

function Sidebar({ mobileOpen, onDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Map', icon: <MapIcon />, path: '/map' },
    { text: 'Compare Data', icon: <CompareIcon />, path: '/compare' },
    { text: 'Learn', icon: <SchoolIcon />, path: '/learn' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            selected={location.pathname === item.path}
            onClick={isMobile ? onDrawerToggle : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default Sidebar;