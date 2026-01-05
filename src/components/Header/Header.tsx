
import RealTimeClock from '../Ui/timer';
import { Link } from 'react-router-dom';

import '../Layout/Layout.css';






    export const Header = () => {

   
    return (
        <>
        <header className="header w-full bg-emerald-800 flex p-4">
        <div className='flex justify-center items-center w-full'>
        <h1 className='font-bold text-2xl p-2'>Klinik</h1>
        <div>
            <div><RealTimeClock /></div>
        </div>
        </div>

        { /* 
        <div className="">
          <button className="transition-all duration-500 ease-in-out transform hover:cursor-pointer " onClick={HandleDarkMode} >
          {darkMode ?  <DarkModeIcon className="animate-in fade-in zoom-in duration-500"/> :
           <SunnyIcon className="animate-in fade-in zoom-in duration-500" />}
          </button>
        
       
        </div>
        */}
<div className='flex justify-center items-center w-full gap-8'>
  <Link className="hover:cursor-pointer" to="/admin"  >Nomor Layout</Link>
  <Link to="/nomor-antrean" >Nomor Terpanggil</Link>
</div>
      
      </header>

        </>
    )
}