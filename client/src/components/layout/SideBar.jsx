import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ArticleIcon from '@mui/icons-material/Article';
import { ReactComponent as NutriNomadLogo } from '../../assets/images/nutrinomad.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserContext from '../../hooks/useUserContext';

const drawerWidth = 280;

const paths = ['/food/dashboard', '/food/diary', '/food/search', '/articles'];

const SideBar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, dispatch } = useUserContext();

  const fetchUser = async () => {
    if (!user) {
      return;
    }
    const response = await axios.get(`/api/user/${user._id}`);
    dispatch({ type: 'SET_USER_DATA', payload: response.data });
  };

  useEffect(() => {
    fetchUser();
    // check if the current route matches the path of a menu item
    const currentIndex = paths.findIndex((path) => location.pathname === path);
    setSelectedItem(currentIndex);
  }, [location]);

  const handleItemClick = (index, path) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    //Format date to YYYY-MM-DD
    const date = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    //default mealType
    const mealType = 'breakfast';

    navigate(path, { state: { date, mealType } });
    setSelectedItem(index);
  };

  const handleBoxClick = () => {
    navigate('/user/profile');
  };

  return (
    <>
      {userData && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#D7F5FF',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Link href="/">
              <NutriNomadLogo className="w-40" />
            </Link>
          </Toolbar>
          <Divider />
          <Toolbar>
            {user && (
              <Box
                className="flex justify-start items-center bg-pastel-green w-full rounded-3xl p-4 my-4 cursor-pointer"
                onClick={handleBoxClick}
              >
                <Avatar
                  src={
                    userData.avatar &&
                    `data:image/jpeg;base64,${userData.avatar}`
                  }
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Typography className="font-medium px-4">
                  {userData.name}
                </Typography>
              </Box>
            )}
          </Toolbar>
          <List>
            {[
              {
                text: 'Dashboard',
                icon: <DashboardIcon fontSize="inherit" />,
                index: 0,
                path: paths[0],
              },
              {
                text: 'Food Diary',
                icon: <LocalDiningIcon fontSize="inherit" />,
                index: 1,
                path: paths[1],
              },
              {
                text: 'Browse Food Database',
                icon: <FoodBankIcon fontSize="inherit" />,
                index: 2,
                path: paths[2],
              },
              {
                text: 'Articles',
                icon: <ArticleIcon fontSize="inherit" />,
                index: 3,
                path: paths[3],
              },
            ].map((item) => (
              <ListItem key={item.text} className="p-2">
                <ListItemButton
                  className={`py-4 rounded-lg ${
                    selectedItem === item.index ? 'bg-selected-blue' : ''
                  }`}
                  onClick={() => handleItemClick(item.index, item.path)}
                >
                  <ListItemIcon style={{ fontSize: '32px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
