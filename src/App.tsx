import "./index.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import AntrianPendaftaranPage from "./Pages/Antrian/AntrianPendaftaranPage";
import DataPasienPage from "./Pages/Pasien/DataPasienPage";
import TombolAntrean from "./Pages/Antrian/TombolAntrian";
import { PasienPage } from "./Pages/Pasien/PasienPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/nomor-antrean" element={<AntrianPendaftaranPage />} />
          <Route path="/data-pasien" element={<PasienPage />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
