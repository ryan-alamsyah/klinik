import { useState, useEffect } from "react";
import { axiosInstance } from "../../components/lib/axios";
import FormDokter from "./FormDokter";
import TabelDokter from "./TabelDokter";

interface Dokter {
   id: string;
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

const DataDokter = () => {
  const [dokters, setDokters] = useState<Dokter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDokter = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/data-dokter");
      setDokters(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  const filteredDokters = dokters.filter(
    (d) =>
      d.nameDokter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.poli.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <FormDokter
        fetchDokter={fetchDokter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <TabelDokter dokters={filteredDokters} fetchDokter={fetchDokter} />
    </>
  );
};

export default DataDokter;
