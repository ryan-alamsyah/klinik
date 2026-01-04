
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <>
        <aside className="sidebar">
        <ul className="flex flex-col gap-1 justify-center">
        
       
        <Link to='/admin'>Dashboard</Link>
          
          <li>Data User</li>
          <li>Setting</li>
        </ul>
      </aside>

        </>
    )
}

export default Sidebar;