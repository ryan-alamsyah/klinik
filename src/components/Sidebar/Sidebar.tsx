
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { useState } from 'react';
import { FcOnlineSupport } from "react-icons/fc";


const Sidebar = () => {

    const [isVisible, setIsVisible] = useState(false);

    const handleMenu = () => {
        setIsVisible(!isVisible)
    }

    const subMenuClass = isVisible ? 'visiblee' : 'hiddene';
    return (
        <>
        <aside className="sidebar bg-slate-400">
        <div className="flex flex-col gap-1 justify-center">
        <button onClick={handleMenu} className='hover:bg-slate-600 p-2 cursor-pointer flex items-center gap-4'>
            <FcOnlineSupport 
        />Front Office</button>
       
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        <Link to='/data-pasien' className={subMenuClass}>Data Pasien</Link>
        
            <button onClick={handleMenu} className='hover:bg-slate-600 p-2 cursor-pointer'>Front Office</button>
        </div>
      </aside>

        </>
    )
}

export default Sidebar;