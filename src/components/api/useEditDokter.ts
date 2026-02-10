import { axiosInstance } from "../lib/axios"
import { useState } from "react";



export const useEditDokter = () => {
  const [editDokterIsLoading, setEditDoktersLoading] = useState(false);

interface Dokter {
     id: string;
    nameDokter: string;
    gender: string;
    jadwalPraktek: string;
    poli: string;
  }

  const editDokter = async (id: string, updatedData: Dokter) => {
    try {
        setEditDoktersLoading(true)
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