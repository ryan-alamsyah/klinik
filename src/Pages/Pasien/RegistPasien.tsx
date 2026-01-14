import {  useState } from "react";
import {
  Search,
  UserPlus,
  ClipboardList,
  X,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { useFetchPasien } from "../../components/api/useFetchPasien";
import { axiosInstance } from "../../components/lib/axios";

const RegistPasien = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleUpdateBtn = () => {
    fetchPasiens();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const { fetchPasiens, pasiens } = useFetchPasien();


  type Pasien = {
    name: string;
    nik: string;
    tlp: string;
    tempatLahir: string;
    tglLahir: string;
    alamat: string;
    gender: string;
  };

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

      // refresh list pasien
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

  // Use the same type as pasiens, which is likely PasienResponse
  const [selectedPatient, setSelectedPatient] = useState<Pasien | null>(
    null
  );
  const [selectedPoli, setSelectedPoli] = useState("");
  const [queueNumber, setQueueNumber] = useState<string | null>(null);
  {
    /* 
  const [patients] = useState([
    { id: 1, nama: 'Nurjaman', nik: '3274523071523532', alamat: 'Jl. Margonda No. 12, Depok', telp: '081236241977', tglLahir: '1985-05-20' },
    { id: 2, nama: 'Ryan Jaya Utama', nik: '3274523076345663', alamat: 'Kavling Hijau, Sawangan', telp: '085694221345', tglLahir: '1992-11-12' },
     { id: 2, nama: 'Ryan Jaya Utama', nik: '3274523076345663', alamat: 'Kavling Hijau, Sawangan', telp: '085694221345', tglLahir: '1992-11-12' },
      { id: 2, nama: 'Ryan Jaya Utama', nik: '3274523076345663', alamat: 'Kavling Hijau, Sawangan', telp: '085694221345', tglLahir: '1992-11-12' },
       { id: 2, nama: 'Ryan Jaya Utama', nik: '3274523076345663', alamat: 'Kavling Hijau, Sawangan', telp: '085694221345', tglLahir: '1992-11-12' },
        { id: 2, nama: 'Ryan Jaya Utama', nik: '3274523076345663', alamat: 'Kavling Hijau, Sawangan', telp: '085694221345', tglLahir: '1992-11-12' },
  ]);
*/
  }

  // Filter pasien berdasarkan pencarian
  const filteredPatients = pasiens.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nik.includes(searchQuery)
  );
  console.table(filteredPatients);

  // Accept the same type as pasiens, which is likely PasienResponse
  const handleOpenQueue = (pasiens: Pasien) => {
    setSelectedPatient(pasiens);
    setShowQueueModal(true);
  };

  const handleProcessQueue = () => {
    if (!selectedPoli) return;
    const randomNum = Math.floor(Math.random() * 50) + 1;
    const code =
      selectedPoli === "Umum" ? "A" : selectedPoli === "Gigi" ? "B" : "C";
    setQueueNumber(`${code}-${randomNum}`);
  };

  const closeModals = () => {
    setShowQueueModal(false);
    setSelectedPatient(null);
    setSelectedPoli("");
    setQueueNumber(null);
  };

  return (
    <div className="  bg-slate-50 font-sans text-slate-900  pt-8">
      {/* Main Search & Actions Card */}
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

      {/* Form Registrasi Pasien Baru (Collapsible) */}

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

      {/* Daftar Pasien Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-scroll h-96">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-700">Daftar Pasien Terdaftar</h2>
          <button
            onClick={handleUpdateBtn}
            className="bg-violet-500 p-2 rounded-xl"
          >
            Update
          </button>
          <span className="text-xs font-medium text-slate-500">
            Menampilkan {filteredPatients.length} Data
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold">Identitas Pasien</th>
                <th className="px-6 py-4 font-bold">NIK</th>
                <th className="px-6 py-4 font-bold">Alamat</th>
                <th className="px-6 py-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/40 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.gender}</div>
                    </td>
                    <td className="px-6 py-4  text-sm text-slate-600">
                      {p.nik}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                      {p.alamat}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleOpenQueue(p)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition shadow-sm"
                      >
                        <ClipboardList size={14} /> AMBIL ANTREAN
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-400 italic"
                  >
                    Tidak ada data yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Pengambilan Antrean */}
      {showQueueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {!queueNumber ? (
              <>
                <div className="p-6 text-center border-b border-slate-100">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Pendaftaran Berobat
                  </h3>
                  <p className="text-sm text-slate-500">
                    Silakan pilih poli tujuan untuk pasien:
                  </p>
                  <p className="font-bold text-emerald-700 mt-1">
                    {selectedPatient?.name}
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase">
                      Pilih Poli Klinik
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {["Umum", "Gigi", "KIA"].map((poli) => (
                        <button
                          key={poli}
                          onClick={() => setSelectedPoli(poli)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                            selectedPoli === poli
                              ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                              : "border-slate-100 hover:border-slate-200 text-slate-600"
                          }`}
                        >
                          <span className="font-bold">{poli}</span>
                          {selectedPoli === poli && (
                            <CheckCircle2
                              className="text-emerald-500"
                              size={20}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={closeModals}
                      className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      disabled={!selectedPoli}
                      onClick={handleProcessQueue}
                      className="flex-[2] py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-200"
                    >
                      Konfirmasi Antrean
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center bg-white relative">
                <div className="absolute top-4 right-4 text-slate-300">
                  <Printer size={20} />
                </div>
                <CheckCircle2
                  className="text-emerald-500 mx-auto mb-4"
                  size={56}
                />
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  Berhasil!
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Nomor antrean telah berhasil dicetak
                </p>

                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">
                    Nomor Antrean
                  </div>
                  <div className="text-6xl font-black text-emerald-700 mb-2">
                    {queueNumber}
                  </div>
                  <div className="text-sm font-bold text-slate-700 uppercase">
                    POLI {selectedPoli.toUpperCase()}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-1">
                    <div className="text-[10px] text-slate-400 font-mono flex justify-between px-4">
                      <span>NAMA:</span>
                      <span className="text-slate-600">
                        {selectedPatient?.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex justify-between px-4">
                      <span>WAKTU:</span>
                      <span className="text-slate-600">
                        {currentDateTime.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeModals}
                  className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition"
                >
                  Selesai & Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Info */}
    </div>
  );
};

export default RegistPasien;
