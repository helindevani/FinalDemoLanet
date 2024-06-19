'use client';
import React, { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';
import { LayoutProps, RootState } from '../TypeInterface/AllType';
import Header from './Header';


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <>
   <Header isLogin={isLoggedIn}>{children}</Header>
    </>
  );
};

export default Layout;
