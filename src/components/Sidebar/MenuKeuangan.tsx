import { Link } from "react-router-dom";
import { useState } from "react";

import { IoMdArrowDropleft } from "react-icons/io";

import { GoDotFill } from "react-icons/go";

import { TbReportMoney } from "react-icons/tb";
const MenuKeuangan = () => {
  const [isVisibleKeuangan, setIsVisibleKeuangan] = useState(false);

  const subMenuClassKeuangan = isVisibleKeuangan
    ? "visiblePasien"
    : "hiddenPasien";

  const handleMenuKeuangan = () => {
    setIsVisibleKeuangan(!isVisibleKeuangan);
  };

  return (
    <>
      <div className="flex flex-col justify-center ">
        <button
          onClick={handleMenuKeuangan}
          className="flex items-center gap-2 p-2 justify-between hover:bg-emerald-800 text-gray-500  rounded-xl hover:text-white  cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <TbReportMoney />
            Keuangan
          </div>

          <IoMdArrowDropleft
            className={`text-2xl transition-transform duration-300 ${
              isVisibleKeuangan ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
        <Link to="/list-pasien" className={subMenuClassKeuangan}>
          <div className="hover:bg-emerald-800 hp w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white">
            <GoDotFill />
            Kasir
          </div>
        </Link>
        <Link to="/list-pasien" className={subMenuClassKeuangan}>
          <div className="hover:bg-emerald-800 hp w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white">
            <GoDotFill />
            Laporan
          </div>
        </Link>
      </div>
    </>
  );
};

export default MenuKeuangan;
