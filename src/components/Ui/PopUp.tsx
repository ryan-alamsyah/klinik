import Swal from "sweetalert2";
import { AiFillHome } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const handleClick = () => {
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

  return (
    <div
      onClick={handleClick}
      className="hover:bg-emerald-800 w-full p-4 cursor-pointer flex gap-4 rounded-xl text-gray-500 hover:text-white"
    >
      <AiFillHome className="text-2xl" />
      <span>Nomor Antrean</span>
    </div>
  );
};

export default Sidebar;
