import { useState } from "react";
import { useFetchPasien } from "../../components/api/useFetchPasien";
import { axiosInstance } from "../../components/lib/axios";
import { TextField, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { Dayjs } from "dayjs";
import dayjs from 'dayjs';


const FormPasien = () => {
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

  const { fetchPasiens } = useFetchPasien();
  const [openSuccess, setOpenSuccess] = useState(false);
 

  type FormState = {
    name: string;
    nik: string;
    tempat: string;
    tglLahir: Dayjs | null;
    asuransi: string;
    jk: string;
    tlp: string;
    pekerjaan:string;
    alamat: string;
   
  }

  const [form, setForm] = useState<FormState>({
    name: "",
    nik: "",
    tempat: "",
    tglLahir: null,
    asuransi: "",
    jk: "",
    tlp: "",
    pekerjaan: "",
    alamat: "",
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (value: Dayjs | null) => {
  setForm((prev) => ({
    ...prev,
    tglLahir: value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
        ...form,
        tglLahir: form.tglLahir ? form.tglLahir.format("YYYY-MM-DD") : null,
    }

   

    try {
      await axiosInstance.post("/pasien", payload);

      // refresh list pasien
      await fetchPasiens();
      setOpenSuccess(true);

      // reset form
      setForm({
        name: "",
        nik: "",
        tempat: "",
        tglLahir: null,
        asuransi: "",
        jk: "",
        tlp: "",
        pekerjaan: "",
        alamat: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
    
  const tomorrow = dayjs().add(1, 'day');

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Data pasien berhasil disimpan
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Divider className="font-bold text-xl pb-8">Informasi Pasien</Divider>
        <div className="flex gap-8 justify-center">
          <div className="flex flex-col gap-4">
            <TextField
              id="outlined-basic"
              name="name"
              label="Nama Pasien"
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              style={{ width: 400 }}
              required
            />
            <TextField
              id="outlined-basic"
              label="NIK"
              variant="outlined"
              name="nik"
              value={form.nik}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Nomor Asuransi"
              variant="outlined"
              name="asuransi"
              value={form.asuransi}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Telepon"
              variant="outlined"
              name="tlp"
              value={form.tlp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <TextField
              id="outlined-basic"
              label="Tempat Lahir"
              variant="outlined"
              style={{ width: 400 }}
              name="tempat"
              value={form.tempat}
              onChange={handleChange}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={tomorrow}
                disableFuture
                label="Tanggal Lahir"
                value={form.tglLahir}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    name: "tglLahir",
                    fullWidth: true,
                 
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-select-currency"
              select
              label="Jenis Kelamin"
              name="jk"
              value={form.jk}
              onChange={handleChange}
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
            name="alamat"
            label="Alamat Lengkap"
            variant="outlined"
            value={form.alamat}
            onChange={handleChange}
            required
            multiline
            rows={4}
            style={{ width: 830 }} // Menentukan tinggi awal (jumlah baris)
          />
        </div>
        <div className="flex justify-center mt-4 relative">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white
        ${
          isSubmitting ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
        }`}>
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormPasien;
