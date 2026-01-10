
import RealTimeClock from '../Ui/timer';


import '../Layout/Layout.css';

    export const Header = () => {

   
    return (
      <>
        <header className="header bg-emerald-600 shadow-lg shadow-emerald-600/50 flex justify-between px-4">
          <div>
            <h1 className="font-bold text-2xl p-2 flex items-center gap-2">
              
              Klinik As-Syifa 
            </h1>
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
          <div className=' flex items-center gap-8'>
            <RealTimeClock />
          </div>
        </header>
      </>
    );
}