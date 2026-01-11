import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const TableListPasien = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nama Lengkap", width: 200 },
    {
      field: "nik",
      headerName: "NIK",
      type: "string",
      width: 150,
    },
    {
      field: "tempat",
      headerName: "Tempat Lahir",
      type: "string",
      width: 150,
    },
    {
      field: "tglLahir",
      headerName: "Tanggal Lahir",
      type: "number",
      width: 150,
    },
    {
      field: "asuransi",
      headerName: "Nomor Asuransi",
      type: "string",
      width: 150,
    },
    {
      field: "jk",
      headerName: "Jenis Kelamin",
      type: "string",
      width: 100,
    },
    {
      field: "tlp",
      headerName: "Telepon",
      type: "string",
      width: 150,
    },
    {
      field: "pekerjaan",
      headerName: "Pekerjaan",
      type: "string",
      width: 150,
    },
    {
      field: "alamat",
      headerName: "Alamat",
      type: "string",
      width: 700,
    },
  ];



  const rows = [
    {
      id: 1,
      name: "Nurjaman",
      nik: "3274523071523532",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    },
    {
      id: 2,
      name: "Ryan Jaya Utama",
      nik: "3274523076345663",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    },
    {
      id: 3,
      name: "Ryan Jaya Utama",
      nik: "32745230715673",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    },
    {
      id: 4,
      name: "Ryan Jaya Utama",
      nik: "32745230715673",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    },
    {
      id: 5,
      name: "Nurjaman",
      nik: "3274523071523532",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    },
     {
      id: 5,
      name: "Nurjaman",
      nik: "3274523071523532",
      tempat: "Jakarta",
      tglLahir: "1 Januari 1977",
      asuransi: "0749124",
      jk: "L",
      tlp: " 081236241977",
      pekerjaan: "Freelancer",
      alamat:
        "Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454",
    }
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <div className="pt-8 ">
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              border: 2,
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "oklch(59.6% 0.145 163.225)",
                color: "white",
              },
              // Mengubah warna checkbox di header jika perlu
              "& .MuiDataGrid-columnHeader .MuiCheckbox-root": {
                color: "white",
              },
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default TableListPasien;
