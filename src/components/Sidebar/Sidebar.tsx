import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaChartLine } from "react-icons/fa";
import MenuPendaftaran from "./MenuPendaftaran";
import MenuPasien from "./MenuPasien";
import MenuFarmasi from "./MenuFarmasi";
import MenuKeuangan from "./MenuKeuangan";

const Sidebar = () => {
  return (
    <>
      <aside className="border-2 border-gray-300 p-4 flex flex-col gap-2">
        <Link
          to="/tombol"
          className="text-gray-500 hover:text-white flex items-center gap-2 "
        >
          <div className="hover:bg-emerald-600 hp w-full p-2 cursor-pointer flex gap-2 rounded-xl">
            <FaChartLine className="text-xl" />
            <span>Dashboard</span>
          </div>
        </Link>
        <MenuPendaftaran />
        <MenuPasien />
        <MenuFarmasi />
        <MenuKeuangan />
      </aside>
    </>
  );
};

export default Sidebar;
