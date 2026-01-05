
import './index.css'
import Layout from './components/Layout/Layout'
import { Routes, Route } from "react-router";
import AntrianPendaftaranPage from './components/Antrian/AntrianPendaftaranPage';
import AdminPage from './components/DashboardPage.tsx/DashboardPage';
import DashboardPage from './components/DashboardPage.tsx/DashboardPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
         
          
      <Route index element={<Layout />} />
   
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/nomor-antrean" element={<AntrianPendaftaranPage />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
