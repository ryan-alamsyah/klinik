import { useState } from "react";
import { axiosInstance } from "../../components/lib/axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Search, UserPlus, X } from "lucide-react";
import type { AlertColor } from "@mui/material";
import Toast from "../../components/Ui/Toast";


type Props = {
  fetchPasiens: () => Promise<void>;
  searchQuery: string;
 setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FormPasienCstm = ({ fetchPasiens, searchQuery, setSearchQuery }: Props) => {
    // 1. Definisikan state notifikasi
    const [notification, setNotification] = useState({
      open: false,
      message: "",
      severity: "success" as AlertColor,
    });
  
    // 2. Fungsi helper untuk memicu toast
    const showToast = (message: string, severity: AlertColor = "success") => {
      setNotification({ open: true, message, severity });
    };

  const [showAddForm, setShowAddForm] = useState(false);
   const [openSuccess, setOpenSuccess] = useState<boolean>(false);
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   const [isErorr, setIsError] = useState<boolean | string>(false);

  interface Pasien {
    name: string;
    nik: string;
    tlp: string;
    tempatLahir: string;
    tglLahir: string;
    alamat: string;
    gender: string;
  }

  const [form, setForm] = useState<Pasien>({
    name   : "",
    nik: "",
    tlp: "",
    tempatLahir: "",
    tglLahir: "",
    alamat: "",
    gender: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if(form.nik.length < 16 ) {
      setIsError("");
   
    } else {
        setIsError("NIK lebih dari 16 karakter");
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
    };
    if(form.nik.length < 16) {
   setIsError("*NIK harus berupa 16 digit angka lengkap.");
   setIsSubmitting(false);
     showToast("Input tidak boleh kosong!", "error");
   return
    } if(form.nik.length > 16) {
      setIsError("NIK Lebih dari 16");
    } else {
       setIsSubmitting(true);
       try {
      await axiosInstance.post("/pasien", payload);

      setTimeout(() => {
        fetchPasiens();
        {/*  setOpenSuccess(true); */}
       showToast("Data berhasil disimpan!", "success");
        setShowAddForm(false);
      }, 2000);


      setForm({
        name: "",
        nik: "",
        tlp: "",
        tempatLahir: "",
        tglLahir: "",
        alamat: "",
        gender: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
    }
    
  };



  return (
    <>
    {/*
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
              Data Pasien Berhasil Disimpan
            </Alert>
          </Snackbar>
           */}
           <Toast
                  {...notification}
                  onClose={() => setNotification({ ...notification, open: false })}
                />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Cek Pasien Lama (NIK / Nama)
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Masukkan kata kunci pencarian..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                  showAddForm
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                    : "bg-emerald-600/50 text-white hover:bg-emerald-700 cursor-pointer"
                }`}
              >
                {showAddForm ? <X size={20} /> : <UserPlus size={20} />}
                {showAddForm ? "Tutup Form" : "Pasien Baru"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 overflow-hidden">
            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
              <h2 className="text-emerald-800 font-bold flex items-center gap-2">
                <UserPlus size={18} /> Formulir Registrasi Pasien Baru
              </h2>
              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
                Lengkapi Data
              </span>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Nama Lengkap Pasien *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Nomor Induk Kependudukan (NIK) *
                    </label>
                    <input
                      type="number"
                      name="nik"
                      value={form.nik}
                      onChange={handleChange}
                      placeholder="16 Digit NIK"
                      className={`w-full p-2.5 border rounded-lg 
                        ${isErorr ? "border-red-700 focus:ring-red-500 outline-none" : "border-slate-200 focus:ring-emerald-500 outline-none"}
                        `}
                    /> <span className={`${isErorr ? "text-red-600 block text-xs" : "hidden"}`}>{isErorr}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        name="tempatLahir"
                        value={form.tempatLahir}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        name="tglLahir"
                        value={form.tglLahir}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Jenis Kelamin
                    </label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Laki-laki"
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Perempuan"
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm">Perempuan</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Nomor Handphone/WhatsApp *
                    </label>
                    <input
                      type="text"
                      name="tlp"
                      value={form.tlp}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="08xxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                     
                      name="alamat"
                      value={form.alamat}
                     onChange={handleChange}
                      className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-27"
                      placeholder="Nama jalan, RT/RW, Kecamatan..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <div className="flex justify-center mt-4 relative">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded text-slate-600 border-slate-500 hover:bg-red-400 hover:text-white transition border cursor-pointer"
                >
                  Batal
                </button>
                  </div>
                 <div className="flex justify-center mt-4 relative">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white
                  ${
                    isSubmitting ? "bg-gray-400" : "bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
                  } `}>
                    {isSubmitting && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FormPasienCstm;
