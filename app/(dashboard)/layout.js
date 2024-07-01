import React from 'react';
import SideNav from './_components/SideNav';
import TopHeader from './_components/TopHeader';

const Layout = ({ children}) => {
  return (
    <div>
      <div className={` hidden md:flex flex-col fixed inset-y-0 w-64 h-full z-50`}>
        <SideNav />
      </div>
      <div className='md:ml-64' >
        <TopHeader />
        {children}
      </div>
    </div>
  );
};

export default Layout;





