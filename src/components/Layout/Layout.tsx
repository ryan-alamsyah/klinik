
import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css'


import { Header } from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {


      const [isLayoutOpen, setIsLayoutOpen] = useState(false);

      const [isAntreanActive, setIsAntreanActive] = useState(true);
      
     const layoutClass = isLayoutOpen ?'layout' : 'layoutOffSidebar';

    const handleToggleLayout = () => {
        setIsLayoutOpen(!isLayoutOpen);
    }

    const handleToggleAntrean = () => {
        setIsAntreanActive(!isAntreanActive);
    }
   

 const location = useLocation();
 const isAntreanPage = location.pathname === '/nomor-antrean';

    
    return (
        <>
        <div className={`${layoutClass} `}>
      {/* HEADER */}
      <Header 
        onToggleLayout={handleToggleLayout} 
        onToggleAntrean={handleToggleAntrean} 
      />
    
      {!isAntreanPage && <Sidebar
      />}


      {/* MAIN CONTENT */}
      <main className='main flex-1'>
       <Outlet />
      </main>
    </div>
        </>
    )
}

export default Layout;