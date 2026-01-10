import { Link } from "react-router-dom";
import { useState } from "react";
import {FaAddressBook } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";

const MenuPendaftaran = () => {

  const handleAlert = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Buka nomor antrean di tab baru?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open("/nomor-antrean", "_blank");
      }
    });
  };

   const handleMenuPendaftaran = () => {
    setIsVisiblePendaftaran(!isVisiblePendaftaran);
  };

  const [isVisiblePendaftaran, setIsVisiblePendaftaran] = useState(false);

  const subMenuClassPendaftaran = isVisiblePendaftaran
    ? "visiblePendaftaran"
    : "hiddenPendaftaran";
  return (
  <>  
  <div className="flex flex-col justify-center">
          <button
            onClick={handleMenuPendaftaran}
            className="flex items-center gap-2 p-2 justify-between hover:bg-emerald-800 text-gray-500  rounded-xl hover:text-white  cursor-pointer"
          ><div className="flex items-center gap-2">
 <FaAddressBook  />
            Pendaftaran
          </div>

           
            <IoMdArrowDropleft className={`text-2xl transition-transform duration-300 ${
          isVisiblePendaftaran ? "-rotate-90" :"rotate-0" 
        }`}/>
          </button>
          <Link to="/list-pasien" className={subMenuClassPendaftaran}>
            <div className="hover:bg-emerald-800 hp w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white">
              <GoDotFill />
              Registrasi Pasien
            </div>
          </Link>
           <Link to='/Dashboard' className={subMenuClassPendaftaran}>
            <div onClick={handleAlert}  className="hover:bg-emerald-800 hp w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white">
              <GoDotFill />
             Monitor Antrean
            </div>
          </Link>
          <Link to="/list-pasien" className={subMenuClassPendaftaran}>
            <div className="hover:bg-emerald-800 hp w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white">
              <GoDotFill />
             Jadwal Dokter
            </div>
          </Link>
         
        </div>
        </>
  )
};

export default MenuPendaftaran;
