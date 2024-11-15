import { Box, Button, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Menuitems from './MenuItems';
import NavItemGroup from './NavItemGroup';
import NavMenuItem from './NavMenuItem';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const SidebarItems = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
      </List>
    </Box>
  );
};

export default SidebarItems;
