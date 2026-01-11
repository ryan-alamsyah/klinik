
import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css'


import { Header } from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Minimize } from '@mui/icons-material';

const Layout = () => {

 const location = useLocation();
 const isAntreanPage = location.pathname === '/nomor-antrean';
 const layoutClass  = isAntreanPage ? 'layoutOffSidebar' : 'layout';
 const [minimize, setMinimize] = useState<boolean>(false);
 const handleToggle = () => {
  setMinimize(!minimize);
 }
    
    return (
        <>
        <div className={`${layoutClass} `}>
      {/* HEADER */}
      <Header onToggle={handleToggle} isMinimized={minimize}
        
      />
    
      {!isAntreanPage && <Sidebar
      />}


      {/* MAIN CONTENT */}
      <main className='main flex-1'>
       <Outlet />
      </main>
         <footer className="mt-auto py-6 text-center text-slate-400 text-xs">
        <p>&copy; 2026 Klinik As-Syifa. All rights reserved.</p>
        <p className="mt-1">Sistem Informasi Manajemen Klinik Terpadu v2.1</p>
      </footer>
    </div>
        </>
    )
}

export default Layout;