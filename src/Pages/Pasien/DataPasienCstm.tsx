import { useState } from "react";
import { ClipboardList, Printer, CheckCircle2, RefreshCcw } from "lucide-react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [isSpinner, setIsSpinner] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleUpdateBtn = async () => {
    try {
      setIsSpinner(true);

      await fetchPasiens();

      setOpenSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSpinner(false); // spinner pasti berhenti
    }
  };
  console.table(pasiens);

  const [showQueueModal, setShowQueueModal] = useState(false);


  // Use the same type as pasiens, which is likely PasienResponse
  const [selectedPatient, setSelectedPatient] = useState<Pasien | null>(null);
  const [selectedPoli, setSelectedPoli] = useState("");
  const [queueNumber, setQueueNumber] = useState<string | null>(null);

 

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
    setCurrentDateTime(currentDateTime);
  };

  const closeModals = () => {
    setShowQueueModal(false);
    setSelectedPatient(null);
    setSelectedPoli("");
    setQueueNumber(null);
  };

  return (
    <div className="  bg-slate-50  text-slate-900  pt-8">
      {/* Main Search & Actions Card */}

      {/* Form Registrasi Pasien Baru (Collapsible) */}

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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-scroll h-96">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-700">Data Pasien Terdaftar</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUpdateBtn}
              title="Refresh dsata"
              className="cursor-pointer"
            >
              <RefreshCcw
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
                <th className="px-6 py-4 font-bold">Alamat</th>
                <th className="px-6 py-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pasiens.length > 0 ? (
                pasiens.map((p) => (
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
