'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import AdminHeader from './AdminHeader';
import { LayoutProps, RootState } from '../TypeInterface/AllType';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <>
      {isLoggedIn ? <AdminHeader>{children}</AdminHeader> : <Header>{children}</Header>}
    </>
  );
};

export default Layout;
