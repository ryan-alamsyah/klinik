import { useEffect, useState } from "react";
import {
  ClipboardList,
  Printer,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import { useDeletePasien } from "../../components/api/useDeletePasein";
import { useEditPasien } from "../../components/api/useEditPasien";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { UserPlus } from "lucide-react";
import type { AlertColor } from "@mui/material";
import Toast from "../../components/Ui/Toast";
import Swal from "sweetalert2";

import { axiosInstance } from "../../components/lib/axios";

interface Pasien {
  id: string;
  name: string;
  nik: string;
  tlp: string;
  tempatLahir: string;
  tglLahir: string;
  alamat: string;
  gender: string;
}

interface Props {
  pasiens: Pasien[];
  fetchPasiens: () => Promise<void>;
}

const RegistPasien = ({ pasiens, fetchPasiens }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isSpinner, setIsSpinner] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Pasien | null>(null);
  const [selectedPoli, setSelectedPoli] = useState("");
  const [queueNumber, setQueueNumber] = useState<string>("");
  const [showNomorAntrean, setShowNomorAntrean] = useState(false);

  const { deletePasien } = useDeletePasien();
  const { editPasien } = useEditPasien();

  interface Pasien {
    id: string;
    name: string;
    nik: string;
    tlp: string;
    tempatLahir: string;
    tglLahir: string;
    alamat: string;
    gender: string;
  }
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
    tanggalKunjungan: string;
  }

  const [form, setForm] = useState<Pasien>({
    id: "",
    name: "",
    nik: "",
    tlp: "",
    tempatLahir: "",
    tglLahir: "",
    alamat: "",
    gender: "",
  });
  const [formAntrean, setFormAntrean] = useState<AntreanPasien>({
    pasienId: "",
    nomorAntrean: "",
    name: "",
    gender: "",
    selectedPoli: "",
    status: "Tunggu",
    tglLahir: "",
    tanggalKunjungan: "",
  });

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

  const handleDeleteBtn = async (id: string) => {
    const pasienToDelete = pasiens.find((p) => p.id === id);
    const namaPasien = pasienToDelete ? pasienToDelete.name : "Data ini";

    Swal.fire({
      title: "Konfirmasi",
      html: `Yakin ingin menghapus data pasien: <br>
         <b style="color: #047857; font-size: 1.1rem;">${namaPasien}</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      customClass: {
        confirmButton:
          "bg-red-600 p-2 rounded text-white mr-4 hover:bg-red-800 cursor-pointer",
        cancelButton:
          "bg-slate-500 px-4 py-2 rounded text-white mr-2 hover:bg-slate-600 cursor-pointer",
      },
      buttonsStyling: false,
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deletePasien(id);
        if (success) {
          await fetchPasiens();
          showToast("Data berhasil dihapus!", "success");
        } else {
          showToast("Gagal Menghapus Data!", "error");
        }
      }
    });
  };

  const handleEditBtn = async (id: string) => {
    if (!selectedPatient) return;

    const success = await editPasien(id, selectedPatient);

    if (success) {
      setIsSubmitting(true);
      await fetchPasiens();
      setTimeout(() => {
        setIsSubmitting(false);
        closeModalsEdit();
        showToast("Data berhasil disimpan!", "success");
      }, 1000);
    } else {
      alert("Gagal memperbarui data.");
    }
  };

  const handleRefetchData = async () => {
    try {
      setIsSpinner(true);

      await fetchPasiens();

      setOpenSuccess(true);
    } catch (error) {
      showToast("Gagal memuat data pasien.", "error");
      console.error(error);
    } finally {
      setIsSpinner(false); // spinner pasti berhenti
    }
  };

  // Accept the same type as pasiens, which is likely PasienResponse
  const handleOpenAntrean = (pasiens: Pasien) => {
    setSelectedPatient(pasiens);
    console.log(pasiens);
    setShowQueueModal(true);
  };

  const handleEditModals = (pasiens: Pasien) => {
    setSelectedPatient(pasiens);
    setShowEditModal(true);
  };

  {
    /* 
 
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");

    if (confirmDelete) {
      const success = await deletePasien(id);
      console.log(success);
      if (success) {
        // Panggil fetchPasiens milik props untuk mengupdate UI
        await fetchPasiens();
        showToast("Data berhasil dihapus!", "success");
      } else {
        showToast("Gagal Menghapus Data!", "error");
      }
    } 
  };
*/

    useEffect(() => {
      if (selectedPatient) {
        setFormAntrean({
          ...formAntrean,
          name: selectedPatient.name,
          gender: selectedPatient.gender,
          pasienId: selectedPatient.id,
          tglLahir: selectedPatient.tglLahir,
          status: "Tunggu",
        });
      }
    }, [selectedPatient]);
  }
  const handleConfirmAntrean = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.get<AntreanPasien[]>("/antrean");
      const allAntrean = res.data;

      if (!selectedPoli) return;

      const antreanPoli = allAntrean.filter(
        (a) => a.selectedPoli === selectedPoli,
      );

      const nextNumber = antreanPoli.length + 1;
      const code =
        selectedPoli === "Umum" ? "A" : selectedPoli === "Gigi" ? "B" : "C";

      const newQueueNumber = `${code}-${nextNumber}`;
      setQueueNumber(newQueueNumber);
      const payload = {
        ...formAntrean,
        selectedPoli,
        nomorAntrean: newQueueNumber,
        status: "Tunggu",
        tanggalKunjungan: new Date().toISOString().split("T")[0],
      };

      await axiosInstance.post("/antrean", payload);
    } catch (error) {
      console.log(error);
    }
    setShowQueueModal(false);
    showToast("Antrean Berhasil Dibuat!", "success");
    setSelectedPoli("");
    setShowNomorAntrean(true);
    setCurrentDateTime(new Date());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Jika sedang mode edit, sinkronkan juga selectedPatient agar data tetap konsisten
    if (selectedPatient) {
      setSelectedPatient((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };
  const closeModalsEdit = () => {
    setShowEditModal(false);
    setSelectedPatient(null);
  };

  const closeModalsAntrean = () => {
    setShowQueueModal(false);
    setSelectedPatient(null);
    setSelectedPoli("");
    setQueueNumber("");
  };

  return (
    <div className="  bg-slate-50  text-slate-900 pb-14">
      {/* Main Search & Actions Card */}

      {/* Form Registrasi Pasien Baru (Collapsible) */}
      <Toast
        {...notification}
        onClose={() => setNotification({ ...notification, open: false })}
      />

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
          Fetch Data Pasien Berhasil
        </Alert>
      </Snackbar>
      {/* Daftar Pasien Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-scroll h-96 xl:h-152 ">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-700">Data Pasien Terdaftar</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefetchData}
              title="Refresh data"
              className="cursor-pointer"
            >
              <RefreshCw
                size={14}
                className={isSpinner ? "animate-spin duration-300" : ""}
              />
            </button>

            <span className="text-xs font-medium text-slate-500">
              Menampilkan {pasiens.length} Data
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold">Identitas Pasien</th>
                <th className="px-6 py-4 font-bold">NIK</th>
                <th className="px-6 py-4 font-bold">Tlp</th>
                <th className="px-6 py-4 font-bold">Alamat</th>
                <th className="px-6 py-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pasiens.length > 0 ? (
                pasiens
                  .slice()
                  .reverse()
                  .map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-emerald-50/40 transition"
                    >
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.gender}</div>
                      </td>
                      <td className="px-6 py-4  text-sm text-slate-600">
                        {p.nik}
                      </td>
                      <td className="px-6 py-4  text-sm text-slate-600">
                        {p.tlp}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 ">
                        {p.alamat}
                      </td>

                      <td className="flex justify-center gap-1.5 items-center  p-4">
                        <button
                          title="Ambil Antrean"
                          onClick={() => handleOpenAntrean(p)}
                          className="inline-flex items-center p-2 bg-orange-400 text-white text-xs font-bold rounded-lg hover:bg-orange-500 transition shadow-sm cursor-pointer"
                        >
                          <ClipboardList size={14} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => handleEditModals(p)}
                          className="inline-flex items-centerpx-4 p-2 bg-emerald-400 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition shadow-sm cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          title="Hapus"
                          onClick={() => handleDeleteBtn(p.id)}
                          className="inline-flex items-center p-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition shadow-sm cursor-pointer"
                        >
                          <Trash2 size={14} />
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
      {/* 
      {showQueueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <form onSubmit={handleConfirmAntrean}>
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
                  <div className="hidden">

                  
                  <span>${selectedPatient?.id}</span>
                   <span>${selectedPatient?.gender}</span>
                   </div>
                </div>
               
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase">
                      Pilih Poli Klinik
                    </label>
                    
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={closeModalsAntrean}
                      className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      
                     type="submit"
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
                  onClick={closeModalsAntrean}
                  className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition"
                >
                  Selesai & Tutup
                </button>
              </div>
            )}
          </div>
         </form>
        </div>
      )}
*/}
      {showQueueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleConfirmAntrean}>
            <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 overflow-hidden pb-4 ">
              <div className="flex justify-end p-2">
                <button onClick={closeModalsAntrean}>
                  <X className="text-red-300 cursor-pointer hover:text-red-500" />
                </button>
              </div>
              <div className="px-6">
                <div className="pt-2 px-6 pb-6 text-center border-b border-slate-100">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Pendaftaran Berobat
                  </h3>
                  <p className="text-sm text-slate-500">
                    Silakan pilih poli tujuan untuk pasien:
                  </p>

                  <input
                    type="text"
                    name="name"
                    value={formAntrean.name}
                    onChange={handleChange}
                    className="font-bold text-emerald-700 mt-1 text-center outline-none"
                    readOnly
                  />
                </div>
                <div className="hidden">
                  <input
                    type="text"
                    name="gender"
                    value={formAntrean.gender}
                    onChange={handleChange}
                  />
                   <input
                    type="date"
                    name="tglLahir"
                    value={formAntrean.tglLahir}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {["Umum", "Gigi", "KIA"].map((poli) => (
                    <button
                      type="button"
                      key={poli}
                      onClick={() => setSelectedPoli(poli)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                        selectedPoli === poli
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                          : "border-slate-100 hover:border-slate-200 text-slate-600"
                      }`}
                    >
                      <span className="font-bold">Poli {poli}</span>
                      {selectedPoli === poli && (
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition mt-4 cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Modal Nomor Antrean Pasien */}
      {showNomorAntrean && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="p-8 text-center bg-white relative rounded-2xl">
            <div className="absolute top-4 right-4 text-slate-300">
              <Printer size={20} />
            </div>
            <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={56} />
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              Berhasil!
            </h3>

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
              onClick={() => setShowNomorAntrean(false)}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition"
            >
              Selesai & Tutup
            </button>
          </div>
        </div>
      )}
        {/* Modal Edit Data Pasien */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (selectedPatient) {
                await handleEditBtn(selectedPatient.id);
                console.log(selectedPatient);
              }
            }}
          >
            <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 mb-8 animate-in slide-in-from-top-4 duration-300 overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
                <h2 className="text-emerald-800 font-bold flex items-center gap-2">
                  <UserPlus size={18} /> Formulir Edit Pasien
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
                        value={selectedPatient?.name}
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
                        value={selectedPatient?.nik}
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
                          value={selectedPatient?.tempatLahir}
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
                          value={selectedPatient?.tglLahir}
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
                            checked={selectedPatient?.gender === "Laki-laki"}
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
                            checked={selectedPatient?.gender === "Perempuan"}
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
                        value={selectedPatient?.tlp}
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
                        value={selectedPatient?.alamat}
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
                      onClick={closeModalsEdit}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded text-slate-600 border-slate-500 hover:bg-slate-200 transition border cursor-pointer"
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

      {/* Footer Info */}
    </div>
  );
};

export default RegistPasien;
