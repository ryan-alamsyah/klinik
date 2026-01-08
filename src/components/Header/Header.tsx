
import RealTimeClock from '../Ui/timer';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";

import '../Layout/Layout.css';







    export const Header = () => {

   
    return (
        <>
        <header className="header bg-emerald-800 flex">
          
          <h1 className='font-bold text-2xl p-2 flex items-center gap-2'><MdLocalHospital />Klinik</h1>
                       
         

        <div className='flex justify-center items-center w-full'>
        
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
  <Link className="hover:cursor-pointer" to="/dashboard"  >Nomor Layout</Link>
  <Link to="/nomor-antrean" >Nomor Terpanggil</Link>
</div>
      
      </header>

        </>
    )
}