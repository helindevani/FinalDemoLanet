'use client';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import AdminHeader from './AdminHeader';
import { useSelector } from 'react-redux';

interface RootState {
  auth: AuthState;
}

interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
  status: string;
}

const Layout = ({ children }: { children: any }): JSX.Element => {
  const {token}  = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Use a truthiness check instead of token !== null
    if (token !== null) {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false)
    }
  }, [token]);
  return (
    <>
      {isLoggedIn ? <AdminHeader /> : <Header />}
      {/* <div className="mt-[85px]"> */}
        {children}
      {/* </div> */}
      <Footer />
    </>
  );
};

export default Layout;
