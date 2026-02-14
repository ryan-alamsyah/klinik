import { axiosInstance } from "../lib/axios";
import { useState } from "react";

export const useEditDokter = () => {
  const [editDokterIsLoading, setEditDoktersLoading] = useState(false);

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

  const editDokter = async (id: string, updatedData: Dokter) => {
    try {
      setEditDoktersLoading(true);
      await axiosInstance.patch(`/data-dokter/${id}`, updatedData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setEditDoktersLoading(false);
    }
  };

  return { editDokter, editDokterIsLoading };
};
