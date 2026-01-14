import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import type { Dayjs } from "dayjs";

{/* tglLahir: Dayjs | null; 
  kalau pakau MUI */}
type PasienResponse = {
   id: string;
   name: string;
     nik: string;
     tempatLahir: string;
      tglLahir: string;
     asuransi: string;
     gender: string;
     tlp: string;
     pekerjaan:string;
     alamat: string;
};

export const useFetchPasien = () => {
  const [pasiens, setPasiens] = useState<PasienResponse[]>([]);
  const [pasienIsLoading, setPasienIsLoading] = useState(false);

  const fetchPasiens = async () => {
    try {
      setPasienIsLoading(true);
      const res = await axiosInstance.get<PasienResponse[]>("/pasien");
      setPasiens(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPasienIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPasiens();
  }, []);

  return {
    fetchPasiens,
    pasiens,
    pasienIsLoading,
  };
};
