
import { TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from '@mui/material/Divider';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const DataPasienPage = () => {
  const currencies = [
    {
      value: "Laki-laki",
      label: "Laki-laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'NamaLengkap', headerName: 'Nama Lengkap', width: 400 },

  {
    field: 'alamat',
    headerName: 'alamat',
    type: 'string',
    width: 800,
  },
  
];

const rows = [
  { id: 1, NamaLengkap: "Ryan Jaya Utama", alamat: "bogor Konoha" },
  { id: 2, NamaLengkap: "Ujang Nurjaman", alamat: "bogor Konoha" },
  { id: 3, NamaLengkap: "JRyan Jaya Utamaime", alamat: "bogor Konoha" },
  { id: 4, NamaLengkap: "Ryan Jaya Utama", alamat: "bogor Konoha"},
  { id: 5, NamaLengkap: "Ryan Jaya Utama", alamat: "bogor Konoha" },
  { id: 6, NamaLengkap: "Ryan Jaya Utama", alamat: "bogor Konoha"},
  { id: 7, NamaLengkap: "Ferrara", alamat: "bogor Konoha" },
  { id: 8, NamaLengkap: "Rossini", alamat: "bogor Konoha"},
  { id: 9, NamaLengkap: "Harvey", alamat: "bogor Konoha" },
];

const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
     <div className="py-4">

     

        <form >
          <Divider className="font-bold text-xl pb-8">Informasi Pasien</Divider>
          <div className="flex gap-8 justify-center">
            <div className="flex flex-col gap-4">
              <TextField
                id="outlined-basic"
                label="Nama Pasien"
                variant="outlined"
                style={{width: 400}}
              />
              <TextField id="outlined-basic" label="NIK" variant="outlined" />
              <TextField
                id="outlined-basic"
                label="Nomor Asuransi"
                variant="outlined"
              />

              <TextField
                id="outlined-basic"
                label="Telepon"
                variant="outlined"
              />
            </div>

             <div className="flex flex-col gap-4">
              <TextField
                id="outlined-basic"
                label="Tempat Lahir"
                variant="outlined"
                style={{width: 400}}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <TextField
                id="outlined-select-currency"
                select
                label="Jenis Kelamin"
                defaultValue="Laki-Pilih"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
               <TextField
                id="outlined-basic"
                label="Pekerjaan"
                variant="outlined"
              />
            </div> 
          </div>
          <div className="mt-4 flex justify-center">

         
          <TextField
                id="outlined-multiline"
                label="Alamat Lengkap"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: 830 }} // Menentukan tinggi awal (jumlah baris)
              />
              
               </div>
               <div className="flex justify-center mt-4 relative">
                <button type="submit" className="border-2 border-emerald-600/50 hover:bg-emerald-600 hover:duration-700  p-2 rounded-2xl cursor-pointer text-gray-500 hover:text-white">Rekam Pasien</button>
               </div>
               
        </form>
<div className="pt-8">
   
  <Paper sx={{ height: 400, width: '100%' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    initialState={{ pagination: { paginationModel } }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    sx={{
      border: 0,
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'oklch(59.6% 0.145 163.225)',
        color: 'white',
      },
      
      // Mengubah warna checkbox di header jika perlu
      '& .MuiDataGrid-columnHeader .MuiCheckbox-root': {
        color: 'white',
      },
    }}
  />
</Paper>
</div>
        
    </div>
    </>
  );
};

export default DataPasienPage;
