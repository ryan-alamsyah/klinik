import { useState } from "react";
import { axiosInstance } from "../../components/lib/axios";

import { Search, UserPlus, X } from "lucide-react";
import type { AlertColor } from "@mui/material";
import Toast from "../../components/Ui/Toast";

type Props = {
  fetchDokter: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FormDokter = ({ fetchDokter, searchQuery, setSearchQuery }: Props) => {
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isInputErorr, setIsInputErorr] = useState<boolean | string>(false);

  interface Dokter {
    nameDokter: string;
    NIK: string;
    foto: string;
    tlp: string;
    gender: string;
    tmptLahir: string;
    tglLahir: string;
    alamat: string;
    nmrIdi: string;
    nmrSTR: string;
    endSTR: string;
    biaya: string;
    npwp: string;
    poli: string;
  }

  const [form, setForm] = useState<Dokter>({
    nameDokter: "",
    NIK: "",
    foto: "",
    tlp: "",
    gender: "",
    tmptLahir: "",
    tglLahir: "",
    alamat: "",
    nmrIdi: "",
    nmrSTR: "",
    endSTR: "",
    biaya: "",
    npwp: "",
    poli: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setIsInputErorr(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
    };

    if (form.nameDokter.trim() === "") {
      setIsInputErorr("Tidak Boleh Kosong");
    } else {
      setIsInputErorr(false);
      setIsSubmitting(true);

      try {
        await axiosInstance.post("/data-dokter", payload);

        setTimeout(() => {
          fetchDokter();
          {
            /*  setOpenSuccess(true); */
          }
          showToast("Data berhasil disimpan!", "success");
          setShowAddForm(false);
        }, 3000);

        setForm({
          nameDokter: "",
          NIK: "",
          foto: "",
          tlp: "",
          gender: "",
          tmptLahir: "",
          tglLahir: "",
          alamat: "",
          nmrIdi: "",
          nmrSTR: "",
          endSTR: "",
          biaya: "",
          npwp: "",
          poli: "",
        });
      } catch (error) {
        showToast("Gagal menyimpan data pasien.", "error");
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
      <Toast
        {...notification}
        onClose={() => setNotification({ ...notification, open: false })}
      />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Cek Dokter ( Nama / Poli )
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
                onClick={() => {
                  setShowAddForm(!showAddForm);
                }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                  showAddForm
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                    : "bg-emerald-600/50 text-white hover:bg-emerald-700 cursor-pointer"
                }`}
              >
                {showAddForm ? <X size={20} /> : <UserPlus size={20} />}
                {showAddForm ? "Tutup Form" : "Add Dokter"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="2xl:w-196 w-196 overflow-y-scroll max-h-142">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
                  <h2 className="text-emerald-800 font-bold flex items-center gap-2">
                    <UserPlus size={18} /> Formulir Data Dokter
                  </h2>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
                    Lengkapi Data
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      1. Identitas Pribadi
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          name="nameDokter"
                          value={form.nameDokter}
                          onChange={handleChange}
                          placeholder="Nama Lengkap"
                          className={` p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-84
                        ${
                          isInputErorr === "ok"
                            ? "border-emerald-500 border-2 outline-none"
                            : "border-slate-200 focus:ring-emerald-500 outline-none"
                        }
                        `}
                        />{" "}
                        <span
                          className={`${
                            isInputErorr === "ok"
                              ? "text-emerald-600 block text-xs"
                              : "text-red-600 text-xs"
                          }`}
                        >
                          {isInputErorr &&
                            (isInputErorr === "ok"
                              ? "✓ Nama Valid"
                              : isInputErorr)}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          NIK
                        </label>
                        <input
                          type="number"
                          name="NIK"
                          value={form.NIK}
                          onChange={handleChange}
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-84"
                          placeholder="NIK"
                        ></input>
                      </div>
                      

                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ">
                          Foto*
                        </label>
                        <input
                          type="file"
                          name="foto"
                          value={form.foto}
                          onChange={handleChange}
                          className="p-2.5 border w-84 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none "
                        ></input>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          Nomor Tlp
                        </label>
                        <input
                          type="number"
                          name="tlp"
                          value={form.tlp}
                          onChange={handleChange}
                          placeholder="Masukan Nomor Telepon"
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-84 "
                        ></input>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          Jenis Kelamin
                        </label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value="Laki-laki"
                              onChange={handleChange}
                              required
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
                              required
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm">Perempuan</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase ">
                            Tempat Lahir
                          </label>
                          <input
                            type="text"
                            name="tmptLahir"
                            value={form.tmptLahir}
                            onChange={handleChange}
                            placeholder="Kota"
                            className="p-2.5 border w-42 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none "
                          ></input>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase ">
                            Tanggal Lahir
                          </label>
                          <input
                            type="date"
                            name="tglLahir"
                            value={form.tglLahir}
                            onChange={handleChange}
                            className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none "
                          ></input>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          Alamat
                        </label>
                        <textarea
                          name="alamat"
                          value={form.alamat}
                          onChange={handleChange}
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-86"
                          placeholder="Masukan Alamat Domisili"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          Nomor Tlp
                        </label>
                        <input
                          type="number"
                          name="tlp"
                          value={form.tlp}
                          onChange={handleChange}
                          placeholder="Masukan Nomor Telepon"
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-86"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 border-b border-slate-200 mt-8">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      2. Data Profesional & Legalitas
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase">
                          NPA IDI
                        </label>
                        <input
                          name="nmrIdi"
                          value={form.nmrIdi}
                          onChange={handleChange}
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none  w-84"
                          placeholder="Nomor Pokok Anggota IDI"
                        ></input>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase ">
                          Nomor STR
                        </label>
                        <input
                          type="number"
                          name="nmrSTR"
                          value={form.nmrSTR}
                          onChange={handleChange}
                          className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none  w-84"
                          placeholder="Surat Tanda Registrasi"
                        ></input>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase ">
                          Berlaku hingga
                        </label>
                        <input
                          type="date"
                          name="endSTR"
                          value={form.endSTR.toLocaleString()}
                          onChange={handleChange}
                          className="block p-2.5 border w-84 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none "
                        ></input>
                      </div>
                    </div>
                      <div className="space-y-1">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ">
                          Biaya Konsultasi
                        </label>
                        <input
                          type="number"
                          name="biaya"
                          value={form.biaya}
                          onChange={handleChange}
                          className="block p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none  w-84"
                          placeholder="Biaya Per 1 Jam"
                        ></input>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ">
                          Nomor NPWP
                        </label>
                        <input
                          type="number"
                          name="npwp"
                          value={form.npwp}
                          onChange={handleChange}
                          className="block p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-84 "
                          placeholder="Nomor NPWP"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1">
  <label className="text-xs font-bold text-slate-500 uppercase">
    Poli
  </label>
  <select
    name="poli"
    value={form.poli}
    onChange={handleChange}
    className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
  >
    <option value="" disabled>Pilih---</option>
    <option value="Umum">Umum</option>
    <option value="Gigi">Gigi</option>
    <option value="Anak">KIA</option>
  </select>
</div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <div className="flex justify-center mt-4 relative">
                      <button
                        onClick={() => {
                          setShowAddForm(false);
                          setForm({
                            nameDokter: "",
                            NIK: "",
                            foto: "",
                            tlp: "",
                            gender: "",
                            tmptLahir: "",
                            tglLahir: "",
                            alamat: "",
                            nmrIdi: "",
                            nmrSTR: "",
                            endSTR: "",
                            biaya: "",
                            npwp: "",
                            poli: "",
                          });
                        }}
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
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
                  } `}
                      >
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
          </div>
        </div>
      )}
    </>
  );
};

export default FormDokter;
