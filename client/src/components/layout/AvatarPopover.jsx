import { useCallback, useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSignOut } from '../../hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserContext from '../../hooks/useUserContext';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

const AvatarPopover = () => {
  const [open, setOpen] = useState(null);
  const { signOut } = useSignOut();
  const { user } = useAuthContext();
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
  }, [user]);

  let navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const goToProfile = () => {
    navigate('/user/profile');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      {userData && (
        <>
          <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar
              src={
                userData.avatar && `data:image/jpeg;base64,${userData.avatar}`
              }
              alt="User Avatar"
            >
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 180,
                '& .MuiMenuItem-root': {
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {userData.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {userData.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem key={option.label} onClick={goToProfile}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleSignOut} sx={{ m: 1 }}>
              Sign Out
            </MenuItem>
          </Popover>
        </>
      )}
    </>
  );
};

export default AvatarPopover;
