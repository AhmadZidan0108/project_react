// Impor pustaka React dan pustaka lain yang diperlukan
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
// Ikon modern untuk sidebar
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';

// Lebar sidebar default
const drawerWidth = 240;

// Daftar item navigasi beserta label, path, dan ikon
const navItems = [
  { label: 'Dashboard', path: '/Dashboard', icon: <DashboardCustomizeIcon /> },
  { label: 'Dataguru', path: '/Dataguru', icon: <GroupIcon /> },
  { label: 'Datasiswa', path: '/Datasiswa', icon: <SchoolIcon /> },
];

// Tema kustom untuk Material-UI
const theme = createTheme({
  palette: {
    primary: { main: '#1A202C' }, // Warna utama (gelap)
    secondary: { main: '#F6AD55' }, // Warna aksen (orange)
    background: { default: '#F7FAFC' }, // Warna latar belakang
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // Font utama
    h6: {
      fontWeight: '700', // Ketebalan font heading
      letterSpacing: '0.5px', // Jarak antar huruf
    },
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); // Status untuk toggle drawer pada mode mobile
  const [collapsed, setCollapsed] = React.useState(false); // Status untuk toggle mode collapsed sidebar
  const location = useLocation(); // Mendapatkan URL path aktif saat ini

  // Fungsi untuk membuka/menutup drawer di mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Fungsi untuk mengatur mode collapsed/expanded pada sidebar
  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  // Konten sidebar
  const drawerContent = (
    <Box
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1A202C 30%, #2D3748)', // Gradien warna gelap
        height: '100%',
        color: '#E2E8F0', // Warna teks
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Judul atau logo sidebar */}
      <Typography variant="h6" sx={{ my: 2 }}>
        {collapsed ? 'D' : 'Data'} {/* Jika collapsed, tampilkan singkatan */}
      </Typography>
      <Divider sx={{ background: '#E2E8F0' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link} // Menggunakan Link untuk navigasi
              to={item.path}
              sx={{
                textAlign: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: 2,
                backgroundColor: location.pathname === item.path ? '#4A5568' : 'transparent', // Highlight item aktif
                '&:hover': {
                  backgroundColor: '#2D3748', // Warna hover
                },
              }}
            >
              {/* Ikon untuk setiap item */}
              {item.icon}
              {!collapsed && (
                <ListItemText
                  primary={item.label} // Label item
                  sx={{
                    ml: 2,
                    color: '#E2E8F0',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* Tombol untuk collapse/expand sidebar */}
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          position: 'absolute',
          bottom: 10,
          left: collapsed ? 8 : drawerWidth - 48,
          color: '#E2E8F0',
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );

  // Mendukung responsivitas dengan container yang sesuai
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: '#1A202C', // Warna AppBar
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Bayangan
          }}
        >
          <Toolbar>
            {/* Tombol menu pada tampilan mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* Judul aplikasi */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                letterSpacing: '0.5px',
              }}
            >
              Data tabel sederhana guru dan siswa SMK BINA NUSANTARA
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Sidebar untuk tampilan mobile */}
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
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 60 : drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Sidebar untuk tampilan desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 60 : drawerWidth, // Menyesuaikan lebar saat collapsed
              transition: 'width 0.3s ease', // Animasi transisi
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
        {/* Area konten utama */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: collapsed ? 0 : `${drawerWidth}px` }, // Menyesuaikan margin konten
            transition: 'margin-left 0.3s', // Animasi transisi
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func, // Props untuk mendukung fungsi window
};

export default Navbar;
