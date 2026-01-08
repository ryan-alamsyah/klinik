
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { useState } from 'react';
import { FaChartLine } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const Sidebar = () => {

    
    const [isVisible, setIsVisible] = useState(false);

    const handleMenu = () => {
        setIsVisible(!isVisible)
    }

    const subMenuClass = isVisible ? 'visiblee' : 'hiddene';
   
    return (
        <>
        <aside className="border-2 border-gray-300 py-4">
            <div className='hover:bg-gray-800 w-full p-4 cursor-pointer flex justify-between '>
                <h1 className="text-gray-500 flex items-center gap-8 "><FaChartLine className='text-2xl'/> Dashboard</h1>
            </div>
            <div className='hover:bg-gray-800 w-full p-4 cursor-pointer flex justify-between '>
                <Link to="/nomor-antrean" className="text-gray-500 flex items-center gap-8 "><AiFillHome className='text-2xl'/>Nomor Antrean</Link>
            </div>
        <div className="flex flex-col gap-1 justify-center">
        <button onClick={handleMenu} className='hover:bg-slate-600 p-2 cursor-pointer flex items-center gap-4'>Front Office</button>
       <FaUserGroup />


        <Link to='/list-pasien' className={subMenuClass}>Pendafaran Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        
          
        </div>
      </aside>

        </>
    )
}

export default Sidebar;