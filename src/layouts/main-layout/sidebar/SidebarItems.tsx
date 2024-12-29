import { Box, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NavItemGroup from './NavItemGroup';
import NavMenuItem from './NavMenuItem';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import generateMenuItems from './MenuItems';

const SidebarItems = () => {
  const location = useLocation();
  const { pathname } = location;
  const { i18n } = useTranslation();
  const [menuItems, setMenuItems] = useState(generateMenuItems());

  useEffect(() => {
    const handleLanguageChange = () => {
      setMenuItems(generateMenuItems()); // Update menu items on language change
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange); // Clean up listener
    };
  }, [i18n]);

  return (
    <Box sx={{ p: 2 }}>
      <List sx={{ pt: 0}}>
        {menuItems.map((item) => {
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
