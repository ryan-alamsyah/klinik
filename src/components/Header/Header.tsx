import RealTimeClock from "../Ui/RealTimeClock";
import { FaStethoscope } from "react-icons/fa";

import "../Layout/Layout.css";

export const Header = () => {
  return (
    <>
      <header className="header bg-emerald-600 shadow-lg shadow-emerald-600/50 flex justify-between items-center px-8 ">
        <div>
          <div className="font-bold text-xl p-2 flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg">
              <FaStethoscope className=" text-emerald-600" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg">Klinik As-Syifa </span>
              <span className="text-xs italic font-light">
                "Melayani dengan Hati & Profesionalisme"
              </span>
            </div>
          </div>
        </div>

        {/* 
        <div className="">
          <button className="transition-all duration-500 ease-in-out transform hover:cursor-pointer " onClick={HandleDarkMode} >
          {darkMode ?  <DarkModeIcon className="animate-in fade-in zoom-in duration-500"/> :
           <SunnyIcon className="animate-in fade-in zoom-in duration-500" />}
          </button>
        
       
        </div>
      
<div className='flex justify-center items-center w-full gap-8'>
  <Link className="hover:cursor-pointer" to="/dashboard"  >Nomor Layout</Link>
</div>
  */}
        <div className=" flex items-center flex-col">
          <RealTimeClock />
        </div>
      </header>
    </>
  );
};
