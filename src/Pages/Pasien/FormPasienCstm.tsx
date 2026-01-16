import { useState } from "react";
import { axiosInstance } from "../../components/lib/axios";

import { Search, UserPlus, X } from "lucide-react";

type Props = {
  fetchPasiens: () => Promise<void>;
  searchQuery: string;
 setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FormPasienCstm = ({ fetchPasiens, searchQuery, setSearchQuery }: Props) => {
  const [showAddForm, setShowAddForm] = useState(false);

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
    name: "",
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
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data yang akan dikirim:", form);
    const payload = {
      ...form,
    };

    try {
      await axiosInstance.post("/pasien", payload);

      await fetchPasiens();
      // reset form

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
    }
  };

  return (
    <>
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
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
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
                      type="text"
                      name="nik"
                      value={form.nik}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="16 Digit NIK"
                    />
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
                      typeof="text"
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-[108px]"
                      placeholder="Nama jalan, RT/RW, Kecamatan..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2.5 border border-slate-300 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-md shadow-emerald-200 transition"
                >
                  Simpan Data Pasien
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FormPasienCstm;
