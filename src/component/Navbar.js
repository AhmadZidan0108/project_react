import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const drawerWidth = 240; // Width of the sidebar
const navItems = [
  { label: 'Dataguru', path: '/Dataguru' },
]

// Light Blue theme with updated colors
const theme = createTheme({
  palette: {
    primary: { main: '#4fa3d1' },  // Light Blue
    secondary: { main: '#0288d1' }, // Darker Blue for secondary elements
    background: { default: '#e1f5fe' }, // Light blue background
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',  // Modern font
    h6: {
      fontWeight: 'bold',
      letterSpacing: '0.5px',
    },
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false); // For sidebar toggle
  const location = useLocation(); // Get the current location

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed); // Toggle between expanded and collapsed sidebar
  };

  const drawerContent = (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #4fa3d1 30%, #81d4fa)', // Light Blue gradient
        height: '100%',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {collapsed ? 'D' : 'Data'}
      </Typography>
      <Divider sx={{ background: '#fff' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: 2,
                backgroundColor: location.pathname === item.path ? '#81d4fa' : 'transparent',
                '&:hover': {
                  backgroundColor: '#80deea', // Hover effect with soft cyan
                },
                transition: 'background-color 0.3s',
              }}
            >
              {item.label === 'Makanan' && <RestaurantIcon sx={{ color: '#fff' }} />}
              {item.label === 'Minuman' && <LocalDrinkIcon sx={{ color: '#fff' }} />}
              {item.label === 'Pakaian Adat' && <CheckroomIcon sx={{ color: '#fff' }} />}
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    ml: 2,
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '500', // Slightly bold text for better legibility
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          position: 'absolute',
          bottom: 10,
          left: collapsed ? 8 : drawerWidth - 48,
          color: '#fff',
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#0288d1', // Darker blue for AppBar
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                letterSpacing: '0.5px',  // Slight letter spacing for clean look
              }}
            >
              Data
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Mobile Sidebar */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 60 : drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 60 : drawerWidth,
              transition: 'width 0.3s ease', // Smooth transition for collapse effect
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: collapsed ? 0 : `${drawerWidth}px` },
            transition: 'margin-left 0.3s', // Smooth transition when sidebar collapses
          }}
        >
          <Toolbar />
          {/* Main content goes here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
