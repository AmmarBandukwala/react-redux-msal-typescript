import React, { useState } from "react";
import { Button } from '@mui/material';
import { logoutAsync } from './authSlice';
import { useAppDispatch } from "../../app/hooks";

const Logout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
