import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAddressBook } from "react-icons/fa"; 
import { IoIosArrowBack } from "react-icons/io";
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
          className="flex items-center gap-2 p-2 justify-between hover:bg-emerald-600  hover:duration-700 text-sm text-gray-500  rounded-xl hover:text-white  cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FaAddressBook />
            <span className="text-sm">Pendaftaran</span>
          </div>

          <IoIosArrowBack
            className={`text-sm transition-transform duration-300 ${
              isVisiblePendaftaran ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
        <Link to="/data-pasien" className={subMenuClassPendaftaran}>
          <div className="hover:bg-emerald-600 hover:duration-700 w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
            <GoDotFill />
            <span className="text-sm">Registrasi Pasien</span>
          </div>
        </Link>
        <Link to="/dashboard" className={subMenuClassPendaftaran}>
          <div
            onClick={handleAlert}
            className="hover:bg-emerald-600 hover:duration-700 w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center"
          >
            <GoDotFill />
            <span className="text-sm">Monitor Antrean</span>
          </div>
        </Link>
        <Link to="/list-antrean-pasien" className={subMenuClassPendaftaran}>
          <div className="hover:bg-emerald-600 hover:duration-700 w-full p-2 cursor-pointer flex gap-4 rounded-xl  hover:text-white items-center">
            <GoDotFill />
            <span className="text-sm">Daftar Antrean</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MenuPendaftaran;
