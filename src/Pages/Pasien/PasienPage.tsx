import FormPasienCstm from "./FormPasienCstm"
import DataPasienCstm from "./DataPasienCstm"
import { useEffect, useState } from "react";
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
  };


export const PasienPage = () => {
    const [pasiens, setPasiens] = useState<Pasien[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPasiens = async () => {
    try {
      setLoading(true);
    
      const res = await axiosInstance.get("/pasien");
      setPasiens(res.data);
    } finally {
      setLoading(false);
    }
  };

  // Filter pasien berdasarkan pencarian
  const filteredPatients = pasiens.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nik.includes(searchQuery)
  );

  useEffect(() => {
    fetchPasiens();
  }, []);

    return (
        <>
        <FormPasienCstm fetchPasiens={fetchPasiens}  searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
        <DataPasienCstm
          pasiens={filteredPatients}
          fetchPasiens={fetchPasiens}
        />
        
        </>
    )
}