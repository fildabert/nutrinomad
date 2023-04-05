import { Toolbar, AppBar } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import AvatarPopover from './AvatarPopover';

const TopBar = () => {
  const { user } = useAuthContext();
  return (
    <AppBar className="flex items-end bg-pastel-blue fixed">
      <Toolbar>{user && <AvatarPopover />}</Toolbar>
    </AppBar>
  );
};

export default TopBar;
