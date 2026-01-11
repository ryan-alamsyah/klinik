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
        <div className="flex gap-4 mt-8">
          <div className="h-26 w-46 bg-slate-100 border border-slate-200 rounded-2xl flex p-2 shadow-lg">
            <div className="flex flex-col gap-8 w-full  justify-evenly ">
              <p className='text-gray-500 text-xs font-medium '>Pasien</p>
              <h1 className='text-2xl'>976</h1>
            </div>
            <div className=' w-full'>
              <Stack direction="column"  sx={{ width: "100%", height:"100px"}} >
                <Stack direction="row" sx={{ width: "100%",  }}>
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
              <p className='text-gray-500 text-xs font-medium '>Pasien</p>
              <h1 className='text-2xl'>976</h1>
            </div>
            <div className=' w-full'>
              <Stack direction="column"  sx={{ width: "100%", height:"100px"}} >
                <Stack direction="row" sx={{ width: "100%",  }}>
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
              <p className='text-gray-500 text-xs font-medium '>Pasien</p>
              <h1 className='text-2xl'>976</h1>
            </div>
            <div className=' w-full'>
              <Stack direction="column"  sx={{ width: "100%", height:"100px"}} >
                <Stack direction="row" sx={{ width: "100%",  }}>
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
      </>
    );
}

export default DashboardPage;