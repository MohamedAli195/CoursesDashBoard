import { Box, Button, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Menuitems from './MenuItems';
import NavItemGroup from './NavItemGroup';
import NavMenuItem from './NavMenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import paths from 'routes/path';


const SidebarItems = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Clear the token from local storage
      localStorage.removeItem('token');
  
      // Show a success message
      toast.success('Logout successful');
  
      // Redirect to the login page
      navigate(paths.login);

      window.location.reload();
    } catch (error) {
      // Handle errors
      toast.error('Logout failed. Please try again.');
      console.error(error);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <List sx={{ pt: 0 }}>
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavItemGroup subheader={item.subheader} key={item.subheader} />;
          } else {
            return <NavMenuItem pathTo={pathname} item={item} key={item.id} />;
          }
        })}
        
          <Button sx={{}} onClick={()=>{handleLogout()}}> 
            Logout
          </Button>
        
      </List>
    </Box>
  );
};

export default SidebarItems;
