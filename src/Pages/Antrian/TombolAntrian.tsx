
import { useState } from "react";

const TombolAntrean = () => {
const [nama, setNama] = useState('UTSMAN BIN AFFAN')
     const handlePanggil = () => {
   
       
    const utterance = new SpeechSynthesisUtterance(`Nomor antrian ${nomor}, atas nama ${nama}, silahkan ke ${loket}`);
    utterance.lang = 'id-ID';
    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.cancel();

     console.log(utterance)
  };
    return (
        <>
 <div className="h-42 w-96 shadow-xl/30  cursor-pointer rounded-lg" onClick={handlePanggil} >
          <h1 className="flex justify-center mb-2 text-slate-500">
            Pengambilan Obat
          </h1>
          <p className="text-3xl font-black tracking-tighter flex justify-center">
            A-20
          </p>
          
        </div>
        
        </>
    )
}

export default TombolAntrean;