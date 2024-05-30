import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar';

const RootLayout = () => {
  return (
    <div className="max-w-3xl mx-auto min-h-lvh pb-14">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default RootLayout;
