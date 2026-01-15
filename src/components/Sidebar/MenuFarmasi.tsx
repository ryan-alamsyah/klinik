import { Link } from "react-router-dom";

import { useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";

import { GoDotFill } from "react-icons/go";
import { MdLocalPharmacy } from "react-icons/md";


const MenuFarmasi = () => {

const [isVisibleFarmasi, setIsVisibleFarmasi] = useState(false);
      const subMenuClassFarmasi = isVisibleFarmasi
    ? "visiblePasien"
    : "hiddenPasien";


    const handleMenuFarmasi = () => {
    setIsVisibleFarmasi(!isVisibleFarmasi);
  };
    return (
        <>
        

         <div className="flex flex-col justify-center ">
                  <button
                    onClick={handleMenuFarmasi}
                    className="flex items-center gap-2 p-2 justify-between hover:bg-emerald-600 hover:duration-700  text-gray-500  rounded-xl hover:text-white  cursor-pointer"
                  ><div className="flex items-center gap-2">
         <MdLocalPharmacy  />
         <span className="text-sm">Farmasi Stok</span>
                    
                  </div>
        
                   
                    <IoMdArrowDropleft className={`text-2xl transition-transform duration-300 ${
                  isVisibleFarmasi ? "-rotate-90" :"rotate-0" 
                }`}/>
                  </button>
                  <Link to="/list-pasien" className={subMenuClassFarmasi}>
                    <div className="hover:bg-emerald-600 hover:duration-700 w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
                      <GoDotFill />
                      <span className="text-sm">Data Obat</span>
                     
                    </div>
                  </Link>
                  <Link to="/list-pasien" className={subMenuClassFarmasi}>
                    <div className="hover:bg-emerald-600 hover:duration-700 w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
                      <GoDotFill />
                      <span className="text-sm">Inventory Alkes</span>
                     
                    </div>
                  </Link>
                 
                </div>
        
        </>
    )
}

export default MenuFarmasi;