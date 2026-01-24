import { Link } from "react-router-dom";

import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";


const MenuPasien = () => {
  const [isVisibleDokter, setIsVisibleDokter] = useState(false);
  const subMenuClassDokter = isVisibleDokter
    ? "visibleDokter"
    : "hiddenDokter";
    const handleMenuDokter = () => {
    setIsVisibleDokter(!isVisibleDokter);
    
  };
    
    return (
        <>
        <div className="flex flex-col justify-center">
                  <button
                    onClick={handleMenuDokter}
                    className="flex items-center gap-2 p-2 justify-between hover:bg-emerald-600 hover:duration-700   text-gray-500  rounded-xl hover:text-white  cursor-pointer"
                  ><div className="flex items-center gap-2">
         <FaUserGroup  />
         <span className="text-sm">Data Dokter</span>
                    
                  </div>
        
                   
                    <IoIosArrowBack className={`text-sm transition-transform duration-300 ${
                  isVisibleDokter ? "-rotate-90" :"rotate-0" 
                }`}/>
              </button>
              <Link to="/list-pasien" className={subMenuClassDokter}>
                <div className="hover:bg-emerald-600 hover:duration-700  w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
                  <GoDotFill />
                  <span className="text-sm">Database Dokter</span>
                  
                </div>
              </Link>
               <Link to="/list-pasien" className={subMenuClassDokter}>
                <div  className="hover:bg-emerald-600 hover:duration-700  w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
                      <GoDotFill />
                      <span className="text-sm">Rekam Medis</span>
                     
                    </div>
                  </Link>
                 
                </div>
        
        </>
    )
}

export default MenuPasien;