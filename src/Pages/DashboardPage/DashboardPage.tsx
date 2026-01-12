import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';



const DashboardPage = () => {

  const [showTooltip, setShowTooltip] = useState(true);

 

    return (
      <>
        <div className="flex gap-4 mt-8 flex-col">
          <div>
            <h2 className="text-slate-500 font-bold">
              Dashboard Klinik As-Syifa
            </h2>
          </div>
          <div className="bg-emerald-600/50 rounded-2xl py-4 px-12 relative w-2xl flex justify-between items-center">
            <div className="text-white font-bold text-sm">
              <p>Selamat Datang</p>
              <span>di Klinik As-Syifa</span>
              <p>Cileungsi</p>
            </div>
            <div>
<img src="src/assets/hero.png" className="w-72"></img>
            </div>
          </div>

          <div className='flex
          gap-4'>

         
          <div className="h-26 w-46  flex rounded-2xl p-2 text-white shadow-lg bg-linear-to-br from-emerald-200 to-emerald-600 hover:scale-[1.02] transition-transform">
            <div className="flex flex-col gap-8 w-full  justify-evenly ">
              <p className="text-white text-xs font-medium ">Antrean Hari Ini</p>
              <h1 className="text-sm font-medium opacity-80">976</h1>
            </div>
            <div className=" w-full">
              <Stack direction="column" sx={{ width: "100%", height: "100px" }}>
                <Stack direction="row" sx={{ width: "100%" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart
                      data={[87, 124, 156, 107, 98, 187, 123, 157]}
                      height={150}
                      showTooltip={showTooltip}
                    />
                  </Box>
                </Stack>
              </Stack>
            </div>
          </div>
          <div className="h-26 w-46 relative overflow-hidden rounded-2xl p-5 text-white shadow-xl shadow-cyan-100 bg-linear-to-br from-cyan-400 to-cyan-600 group hover:scale-[1.02] transition-transform">
                        <p className="text-sm font-medium opacity-80">Dokter Aktif</p>
                        <div className="flex items-end justify-between mt-3">
                            <h3 className="text-4xl font-bold">12</h3>
                            <i className="fas fa-stethoscope text-3xl opacity-30 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                        <i className="fas fa-heart-pulse text-9xl  glass-wave"></i>
                    </div>
          <div className="h-26 w-46 bg-slate-100 border border-slate-200 rounded-2xl flex p-2 shadow-lg">
            <div className="flex flex-col gap-8 w-full  justify-evenly ">
              <p className="text-gray-500 text-xs font-medium ">Pasien</p>
              <h1 className="text-2xl">976</h1>
            </div>
            <div className=" w-full">
              <Stack direction="column" sx={{ width: "100%", height: "100px" }}>
                <Stack direction="row" sx={{ width: "100%" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart
                      data={[87, 124, 156, 107, 98, 187, 123, 157]}
                      height={150}
                      showTooltip={showTooltip}
                    />
                  </Box>
                </Stack>
              </Stack>
            </div>
          </div>
          <div className="h-26 w-46 bg-slate-100 border border-slate-200 rounded-2xl flex p-2 shadow-lg">
            <div className="flex flex-col gap-8 w-full  justify-evenly ">
              <p className="text-gray-500 text-xs font-medium ">Pasien</p>
              <h1 className="text-2xl">976</h1>
            </div>
            <div className=" w-full">
              <Stack direction="column" sx={{ width: "100%", height: "100px" }}>
                <Stack direction="row" sx={{ width: "100%" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart
                      data={[87, 124, 156, 107, 98, 187, 123, 157]}
                      height={150}
                      showTooltip={showTooltip}
                    />
                  </Box>
                </Stack>
              </Stack>
            </div>
          </div>
           </div>
        </div>
      </>
    );
}

export default DashboardPage;