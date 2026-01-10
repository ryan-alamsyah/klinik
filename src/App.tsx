
import './index.css'
import Layout from './components/Layout/Layout'
import { Routes, Route } from "react-router";
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import AntrianPendaftaranPage from './Pages/Antrian/AntrianPendaftaranPage';
import DataPasienPage from './Pages/Pasien/DataPasienPage';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
         
          
      <Route index element={<Layout />} />
   
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/nomor-antrean" element={<AntrianPendaftaranPage />} />
          <Route path="/list-pasien" element={<DataPasienPage />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
