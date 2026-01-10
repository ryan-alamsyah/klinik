import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TextField, MenuItem } from "@mui/material";

const DataPasienPage = () => {

  const currencies = [
  {
    value: 'Laki-laki',
    label: 'Laki-laki',
  },
  {
    value: 'Perempuan',
    label: 'Perempuan',
  },
];
    return (
      <>
        <div className=" ">
          <div className="flex">
            <h1 className="text-2xl flex items-center">Pasien<MdOutlineKeyboardArrowRight /></h1>
           <h1 className="text-2xl flex items-center">Data Pasien<MdOutlineKeyboardArrowRight /></h1>
          </div>

          <form>
            <TextField id="outlined-basic" label="Nama Pasien" variant="outlined" />
            <TextField id="outlined-basic" label="Nomor Asuransi" variant="outlined" />
            <TextField id="outlined-basic" label="Nama Pasien" variant="outlined" />
            <TextField
          id="outlined-select-currency"
          select
          label="Jenis Kelamin"
          defaultValue="Laki-Pilih"
          className="w-36"
          
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          </form>
        </div>
      </>
    );
}

export default DataPasienPage;