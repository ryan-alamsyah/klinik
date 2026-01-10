import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const DataPasienPage = () => {
    return (
      <>
        <div className="bg-red-800 ">
          <div className="flex">
            <h1 className="text-2xl flex items-center">Pasien<MdOutlineKeyboardArrowRight /></h1>
           <h1 className="text-2xl flex items-center">Data Pasien<MdOutlineKeyboardArrowRight /></h1>
          </div>

          <form>
            <input
              type="text"
              placeholder="Nama Pasien"
              className="px-2 border-2 border-amber-400"
            ></input>
          </form>
        </div>
      </>
    );
}

export default DataPasienPage;