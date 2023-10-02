import React, { createContext, useState } from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import Footer from './Footer';
import Navbar from './Navbar';
import { getStats } from 'apiRequests';

export const ApiStatus = createContext(null);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [InfoStats, setInfoStats] = useState<any>();
  const stats = async () => {
    setInfoStats(await getStats());
  };

  React.useEffect(() => {
    stats();
    const timer = setInterval(() => {
      stats();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const { search } = useLocation();
  return (
    <div className='d-flex flex-column flex-fill wrapper'>
      <ApiStatus.Provider value={InfoStats}>
        <Navbar />
        <main className='d-flex flex-column flex-grow-1'>
          <AuthenticatedRoutesWrapper
            routes={routes}
            unlockRoute={`${routeNames.unlock}${search}`}
          >
            {children}
          </AuthenticatedRoutesWrapper>
        </main>
        <Footer />
      </ApiStatus.Provider>
    </div>
  );
};

export default Layout;
