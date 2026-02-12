import { useState } from "react";
import { Pencil, Trash2, RefreshCw, UserPlus } from "lucide-react";
import Swal from "sweetalert2";

import type { AlertColor } from "@mui/material";

import Toast from "../../components/Ui/Toast";
import { useDeleteDokter } from "../../components/api/useDeleteDokter";
import { useEditDokter } from "../../components/api/useEditDokter";

interface Dokter {
  id: string;
  nameDokter: string;
  gender: string;
  jadwalPraktek: string;
  poli: string;
}

interface Props {
  dokters: Dokter[];
  fetchDokter: () => Promise<void>;
}

const TabelDokter = ({ dokters, fetchDokter }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDokter, setSelectedDokter] = useState<Dokter | null>(null);
  const { deleteDokter } = useDeleteDokter();
  const { editDokter } = useEditDokter();

  // 1. Definisikan state notifikasi
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  const showToast = (message: string, severity: AlertColor = "success") => {
    setNotification({ open: true, message, severity });
  };

  /* ================= DELETE ================= */
  const handleDeleteBtn = async (id: string) => {
    const dokter = dokters.find((d) => d.id === id);

    Swal.fire({
      title: "Konfirmasi",
      html: `Yakin ingin menghapus dokter: <br>
        <b style="color:#047857">${dokter?.nameDokter}</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-600 px-4 py-2 rounded text-white mr-2 hover:bg-red-700",
        cancelButton:
          "bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteDokter(id);
        if (success) {
          console.log(await fetchDokter());
          showToast("Data berhasil dihapus!", "success");
        } else {
          showToast("Gagal menghapus data dokter", "error");
        }
      }
    });
  };

  /* ================= EDIT ================= */
  const handleEditModal = (dokter: Dokter) => {
    setSelectedDokter(dokter);
    setShowEditModal(true);
    showToast('oke', 'info')
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDokter) return;
    const { name, value } = e.target;

    setSelectedDokter({
      ...selectedDokter,
      [name]: value,
    });
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDokter) return;

    try {
      setIsSubmitting(true);

      const success = await editDokter(selectedDokter.id, selectedDokter);

      if (success) {
        await fetchDokter();
        setTimeout(() => {});
        setShowEditModal(false);
        showToast("Data berhasil disimpan!", "success");
      } else {
        showToast("Gagal memperbarui data", "error");
      }
    } catch (err) {
      showToast("Terjadi kesalahan", "error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= REFRESH ================= */
  const handleRefetchData = async () => {
    try {
      setIsSpinner(true);
      showToast("oke", "success");
   console.log(await fetchDokter());
    } catch (err) {
      console.log(err);
      showToast("Gagal memuat data dokter.", "error");
    } finally {
      setIsSpinner(false);
    }
  };

  return (
    <>
      <Toast
        {...notification}
        onClose={() => setNotification({ ...notification, open: false })}
      />
      <div className="bg-slate-50 pb-14">
        {/* TOAST */}

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-scroll h-96 xl:h-152 ">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-slate-700">Data Dokter</h2>

            <div className="flex items-center gap-2">
              <button onClick={handleRefetchData}>
                <RefreshCw
                  size={14}
                  className={isSpinner ? "animate-spin" : ""}
                />
              </button>
              <span className="text-xs text-slate-500">
                Menampilkan {dokters.length} data
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Nama Dokter</th>
                  <th className="px-6 py-4 font-bold">Gender</th>
                  <th className="px-6 py-4 font-bold">Poli</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {dokters.length > 0 ? (
                  dokters.map((d) => (
                    <tr key={d.id} className="border-t hover:bg-emerald-50/40">
                      <td className="font-bold text-slate-800 p-4">
                        {d.nameDokter}
                      </td>
                      <td className="px-6 py-4">{d.gender}</td>
                      
                      <td className="px-6 py-4">{d.poli}</td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleEditModal(d)}
                          className="p-2 bg-emerald-500 text-white rounded"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBtn(d.id)}
                          className="p-2 bg-red-600 text-white rounded"
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

        {/* MODAL EDIT */}
        {showEditModal && selectedDokter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-196">
              <form onSubmit={handleSubmitEdit}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Nama Lengkap Dokter *
                          </label>
                          <input
                            type="text"
                            name="nameDokter"
                            value={selectedDokter.nameDokter}
                            onChange={handleChange}
                            placeholder="Nama Lengkap"
                            className={`w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none
                       `}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Jadwal Praktek
                          </label>
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
                                checked={selectedDokter?.gender === "Laki-laki"}
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
                                checked={selectedDokter?.gender === "Perempuan"}
                                onChange={handleChange}
                                required
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm">Perempuan</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Poli
                          </label>
                          <input
                            name="poli"
                            value={selectedDokter?.poli}
                            onChange={handleChange}
                            className="p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none "
                            placeholder="Poli"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                      <div className="flex justify-center mt-4 relative">
                        <button
                          onClick={() => {
                            setShowEditModal(false);
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
      </div>
    </>
  );
};

export default TabelDokter;
