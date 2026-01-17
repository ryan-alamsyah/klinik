import { useState } from "react";
import heroSvg from "../../assets/hero.svg";
import { TbBackground } from "react-icons/tb";

const AntrianPendaftaranPage = () => {
  const [nama, setNama] = useState("UTSMAN BIN AFFAN");
  const [nomor, setNomor] = useState("A 2 0 1");

  const namaPasien = "RYAN ALAMSYAH MANGUNsssJAYA HADININGRAT ";
  const [loket, setLoket] = useState("TRIASE");
  const handlePanggil = () => {
    const utterance = new SpeechSynthesisUtterance(
      `Nomor antrian ${nomor}, atas nama ${nama}, silahkan ke ${loket}`
    );
    utterance.lang = "id-ID";
    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.cancel();

    console.log(utterance);
  };
  return (
    <>
      <div></div>
      <div className="flex  gap-4 items-center py-4">
        <div className="h-56 lg:w-96 relative shadow-xl/30 rounded-lg">
          <div className="border-b-2 border-black py-2">
            <h1 className="flex justify-center mb-2 text-slate-500">
              Nomor Antrean Anda
            </h1>
            <p className="2xl:text-5xl text-2xl font-black tracking-tighter flex justify-center">
              {nomor}
            </p>
          </div>
          <div className="flex justify-center flex-col  ">
            <h1 className="flex justify-center text-slate-500 text-sm">
              NAMA PESERTA
            </h1>
            <p className="font-bold flex justify-center py-2">{nama}</p>
          </div>
          <div>
            <p className="flex justify-center text-slate-500">Tujuan</p>
            <p className="flex justify-center font-bold text-xl">{loket}</p>
          </div>
        </div>

        <div className="flex w-full">
          <img src={heroSvg} className="h-75 object-cover w-full" alt="hero" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="h-42 w-96 shadow-xl/30 rounded-lg">
          <h1 className="flex justify-center mb-2 text-slate-500">
            Pendaftaran
          </h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
        </div>
        <div className="h-42 w-96 shadow-xl/30 rounded-lg">
          <h1 className="flex justify-center mb-2 text-slate-500">Triase</h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
        </div>
        <div className="h-42 w-96 shadow-xl/30 rounded-lg">
          <h1 className="flex justify-center mb-2 text-slate-500">Poli Umum</h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
        </div>
        <div className="h-42 w-96 shadow-xl/30 rounded-lg">
          <h1 className="flex justify-center mb-2 text-slate-500">Poli Umum</h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
        </div>
        <div
          className="h-42 w-96 shadow-xl/30  cursor-pointer rounded-lg"
          onClick={handlePanggil}
        >
          <h1 className="flex justify-center mb-2 text-slate-500">
            Pengambilan Obat
          </h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
        </div>
      </div>
    </>
  );
};

export default AntrianPendaftaranPage;
