import { useEffect, useState } from "react";
import {
  RefreshCw,
  Pencil,
  Check,
  UserPlus,
  Megaphone,
  ClipboardPlus,
} from "lucide-react";
import Toast from "../../components/Ui/Toast";
import type { AlertColor } from "@mui/material";
import { axiosInstance } from "../../components/lib/axios";
import { SearchField } from "../../components/Ui/SearchField";
import useRekamMedisPasien from "../../components/api/useRekamMedisPasien";
import { useAntreanPasien } from "../../components/api/useAntreanPasein";
import useUpdateStatusAntrean from "../../components/api/useUpdateStatusAntrean";

const ListAntreanPasien = () => {
  const [isSpinner, setIsSpinner] = useState(false);
  const [showFormMedis, setshowFormMedis] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showUpdateStatusAntrean, setShowUpdateStatusAntrean] =
    useState<boolean>(false);

    const [countPanggil, setCountPanggil] = useState({})

  const { rekamMedis } = useRekamMedisPasien();
  const { antreanPasien, fetchAntreanPasien } = useAntreanPasien();
  const {updateStatusAntrean} = useUpdateStatusAntrean()
  // 1. Definisikan state notifikasi
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  interface AntreanPasien {
    id?: string;
    pasienId: string;
    name: string;
    poli?: string;
    gender: string;
    tglLahir?: string;
    nomorAntrean: string;
    selectedPoli: string;
    status?: string;
    tanggalKunjungan?: string;
  }

  interface IPemeriksaanFisik {
    tensi: string;
    suhu: number | string;
    beratBadan: number | string;
  }

  interface FormMedisRecord {
    pasienId: string;
    name: string;
    tglLahir: string;
    gender: string;
    keluhan: string;
    diagnosa: string;
    tindakan: string;
    obat: string;
    tanggalKunjungan: string;
    pemeriksaanFisik: IPemeriksaanFisik;
    suratKeterangan: string;
  }
  interface StatusAntrean {
    id: string;
    name: string;
    status: string;
  }

  const [formMedisRecord, setFormMedisRecord] = useState<FormMedisRecord>({
    pasienId: "",
    name: "",
    tglLahir: "",
    gender: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
    obat: "",
    tanggalKunjungan: "",
    pemeriksaanFisik: {
      tensi: "",
      suhu: "",
      beratBadan: "",
    },
    suratKeterangan: "",
  });



  const panggilPasien = (antreanPasien: AntreanPasien) => {
    console.log("Panggil pasien:", antreanPasien);
    showToast(`Memanggil ${antreanPasien.name} (${antreanPasien.nomorAntrean}) Ke ${antreanPasien.status}`)
    
    const utterance = new SpeechSynthesisUtterance(
      `Nomor antrian ${antreanPasien.nomorAntrean}, atas nama ${antreanPasien.name}. Silakan menuju ke ${antreanPasien.status}`,
    );

    utterance.lang = "id-ID";
    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.cancel();
  };

  const [formUpdateStatus, setFormUpdateStatus] = useState<StatusAntrean>({
    id: "",
    status: "",
    name: "",
  })
const handleSubmitUpdateStatus = async (id: string) => {
 console.log("ok")

 if(!formUpdateStatus?.status) return;

 const success = await updateStatusAntrean(id,{
  status: formUpdateStatus.status,
 });

 if (success) {
  await fetchAntreanPasien();
  console.log(success);
 }
  }
  const handleUpdateStatus =  (antreanPasien: AntreanPasien) => {
    setShowUpdateStatusAntrean(true);
    console.log(antreanPasien.name)
    setFormUpdateStatus({
      ...formUpdateStatus,
      name: antreanPasien.name,
    });
   
  };

  

  const handleCloseModalAntrean = () => {
    setSelectedPatient(null);
    setShowUpdateStatusAntrean(false);
  };

  // 2. Fungsi helper untuk memicu toast
  const showToast = (message: string, severity: AlertColor = "success") => {
    setNotification({ open: true, message, severity });
  };

  useEffect(() => {
    fetchAntreanPasien();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsSpinner(true);
      await fetchAntreanPasien();
      showToast("Data antrean pasien berhasil diperbarui", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinner(false);
    }
  };

  const handleFormRekamMedis = (antreanPasien: AntreanPasien) => {
    setshowFormMedis(true);
    setFormMedisRecord({
      ...formMedisRecord,
      pasienId: antreanPasien.pasienId,
      name: antreanPasien.name,
      tglLahir: antreanPasien.tglLahir ?? "",
      gender: antreanPasien.gender,
      tanggalKunjungan: antreanPasien.tanggalKunjungan ?? "",
    });
  };
  const filteredPatients = antreanPasien.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.status?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formMedisRecord,
    };

    try {
      await axiosInstance.post("/rekam-medis", payload);

      setFormMedisRecord({
        pasienId: "",
        name: "",
        keluhan: "",
        diagnosa: "",
        tindakan: "",
        obat: "",
        tanggalKunjungan: "",
        tglLahir: "",
        pemeriksaanFisik: {
          tensi: "",
          suhu: "",
          beratBadan: "",
        },
        gender: "",
        suratKeterangan: "",
      });
      showToast("Rekam medis pasien berhasil disimpan", "success");
      setIsSubmitting(false);
      setshowFormMedis(false);
      fetchAntreanPasien();
    } catch (error) {
      showToast("Gagal menyimpan rekam medis pasien", "error");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const pemeriksaanFisikFields = ["tensi", "suhu", "beratBadan"];

    if (pemeriksaanFisikFields.includes(name)) {
      setFormMedisRecord({
        ...formMedisRecord,
        pemeriksaanFisik: {
          ...formMedisRecord.pemeriksaanFisik,
          [name]: value,
        },
      });
    } else {
      setFormMedisRecord({
        ...formMedisRecord,
        [name]: value,
      });
    }
  };

  return (
    <>
      <Toast
        {...notification}
        onClose={() => setNotification({ ...notification, open: false })}
      />
      <div className="mb-6 flex justify-end">
        <SearchField
          label="Pencarian Antrean Pasien"
          placeholder="Masukan Status Pasien"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-scroll h-96 xl:h-152 ">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-700">Data Antrean Pasien</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              title="Refresh data"
              className="cursor-pointer"
            >
              <RefreshCw
                size={14}
                className={isSpinner ? "animate-spin duration-300" : ""}
              />
            </button>

            <span className="text-xs font-medium text-slate-500">
              Menampilkan {filteredPatients.length} Data
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold">Identitas Pasien</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">POLI</th>
                <th className="px-6 py-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/40 transition">
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.gender}</div>
                      <div className="text-xs text-slate-500">
                        {p.nomorAntrean}
                      </div>
                    </td>
                    <td className="2xl:w-120 lg:w-78 ">
                      <span className="flex gap-1 ju">
                        {["Tunggu", "Triase", "Dokter", "Farmasi"].map(
                          (stepName, index, array) => {
                            const currentStepIndex = array.indexOf(
                              p.status ? p.status : "Tunggu",
                            );

                            // Tahap dianggap selesai jika indeksnya kurang dari atau sama dengan status pasien saat ini
                            const isCompleted = index <= currentStepIndex;
                            return (
                              <>
                                <div className="flex flex-col items-center gap-1">
                                  <span
                                    className={`p-2 rounded-4xl text-xs text-slate-500 ${
                                      isCompleted
                                        ? "bg-emerald-400"
                                        : "bg-gray-400"
                                    }`}
                                  >
                                    <Check size={12} className="text-white" />
                                  </span>
                                  <span className="text-slate-600 text-xs">
                                    {stepName}
                                  </span>
                                </div>
                              
                              </>
                            );
                          },
                        )}
                       
                      </span>
                    </td>
                    <td className="px-6 py-4  text-sm text-slate-600 ">
                      {p.selectedPoli}
                    </td>
                    <div className="flex justify-center gap-1.5 items-center ">
                      <td className="flex justify-center gap-1.5 items-center mt-6">
                        <button
                          title="Rekam Medis"
                          onClick={() => handleFormRekamMedis(p)}
                          className="inline-flex items-center p-2 bg-emerald-400 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition shadow-sm cursor-pointer"
                        >
                          <ClipboardPlus size={14} />
                        </button>
                      </td>
                      <td className="flex justify-center gap-1.5 items-center mt-6">
                        <button
                          title="Panggil Antrian"
                          onClick={() => handleUpdateStatus(p)}
                          className="inline-flex items-center p-2 bg-orange-400 text-white text-xs font-bold rounded-lg hover:bg-orange-500 transition shadow-sm cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                      </td>
                      <td className="flex justify-center gap-1.5 items-center mt-6">
                        <button
                          title="Panggil Antrian"
                          onClick={() => panggilPasien(p)}
                          className="inline-flex items-center p-2 bg-red-400 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition shadow-sm cursor-pointer"
                        >
                          <Megaphone size={14} />
                        </button>
                      </td>
                    </div>
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

      {showFormMedis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSubmit}>
            <div className="bg-white sm:w-198 w-120 rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 sm:overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
                <h2 className="text-emerald-800 font-bold flex items-center gap-2">
                  <UserPlus size={18} /> Formulir Rekam Medis
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
                        Nama Pasien *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formMedisRecord.name}
                        onChange={() => {}}
                        readOnly
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Keluhan *
                      </label>
                      <input
                        type="text"
                        name="keluhan"
                        value={formMedisRecord.keluhan}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="Keluhan pasien"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Tensi
                        </label>
                        <input
                          type="text"
                          name="tensi"
                          value={formMedisRecord.pemeriksaanFisik.tensi}
                          onChange={handleChange}
                          placeholder="120/80"
                          className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Suhu
                        </label>
                        <input
                          type="text"
                          name="suhu"
                          value={formMedisRecord.pemeriksaanFisik.suhu}
                          onChange={handleChange}
                          placeholder="36.5"
                          className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Berat Badan
                        </label>
                        <input
                          type="number"
                          name="beratBadan"
                          value={formMedisRecord.pemeriksaanFisik.beratBadan}
                          onChange={handleChange}
                          placeholder="10"
                          className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Diagnosa *
                      </label>
                      <input
                        type="text"
                        name="diagnosa"
                        value={formMedisRecord.diagnosa}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="Diagnosa penyakit pasien"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Surat Keterangan Medis
                        </label>
                        <select className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                          <option value="sehat">Surat Sehat</option>
                          <option value="sakit">Surat Sakit</option>
                          <option value="rujukan">Surat Rujukan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Tanggal Kunjungan
                        </label>
                        <input
                          type="date"
                          name="tanggalKunjungan"
                          value={formMedisRecord.tanggalKunjungan}
                          onChange={() => {}}
                          className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Jenis Kelamin
                        </label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              checked={
                                formMedisRecord.gender === "Laki-laki" ||
                                formMedisRecord.gender === "Perempuan"
                              }
                              value={formMedisRecord.gender}
                              onChange={handleChange}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm">
                              {formMedisRecord.gender}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Tanggal Lahir
                        </label>
                        <input
                          type="date"
                          name="tglLahir"
                          value={formMedisRecord.tglLahir}
                          onChange={handleChange}
                          className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Tindakan*
                      </label>
                      <input
                        type="text"
                        name="tindakan"
                        value={formMedisRecord.tindakan}
                        onChange={handleChange}
                        placeholder="Tindakan medis yang diberikan"
                        required
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Obat *
                      </label>
                      <select
                        name="obat"
                        value={formMedisRecord.obat}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      >
                        <option value="">Pilih Obat</option>
                        {rekamMedis.map((obat, index) => (
                          <option key={index} value={obat.obat}>
                            {obat.obat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <div className="flex justify-center mt-4  gap-4 relative">
                    <div>
                      <button
                        type="button"
                        onClick={() => setshowFormMedis(false)}
                        className="px-4 py-2 rounded text-slate-600 bg-slate-200 hover:bg-slate-300 transition"
                      >
                        Batal
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white
                                ${
                                  isSubmitting
                                    ? "bg-gray-400"
                                    : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
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
      )}

      {showUpdateStatusAntrean && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={async (e) => {
            e.preventDefault();
            if(formUpdateStatus.id) {
            await handleSubmitUpdateStatus(formUpdateStatus.id);
            
            }
         
          }}>
            <div className="bg-white sm:w-198 w-120 rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 sm:overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
                <h2 className="text-emerald-800 font-bold flex items-center gap-2">
                  <Megaphone size={18} />
                </h2>
                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
                  Status Panggil Antrian
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Nama Pasien *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formUpdateStatus.name}
                          onChange={handleChange}
                          readOnly
                          className="w-full p-2.5 border border-slate-200 rounded-lg outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Status Antrian
                        </label>
                        <select className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={(e) => {
                          setFormUpdateStatus((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }}
                        >
                          <option value="" disabled>Pilih Status</option>
                          <option value="sehat">Triase</option>
                          <option value="dokter">Dokter</option>
                          <option value="resep">Resep</option>
                          <option value="terlewati">Terlewati</option>
                        </select>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="px-4 py-2 cursor-pointer hover:scale-125 rounded text-slate-600 bg-slate-200 hover:bg-slate-300 transition"
                        >
                          Panggil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <div className="flex justify-center mt-4  gap-4 relative">
                    <div>
                      <button
                        type="button"
                        onClick={() => handleCloseModalAntrean()}
                        className="px-4 py-2 rounded text-slate-600 bg-slate-200 hover:bg-slate-300 transition"
                      >
                        Batal
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white
                                ${
                                  isSubmitting
                                    ? "bg-gray-400"
                                    : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
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
      )}
    </>
  );
};

export default ListAntreanPasien;
