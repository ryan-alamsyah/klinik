import { axiosInstance } from "../lib/axios"
import { useState } from "react";



export const useEditPasien = () => {
  const [editPasienIsLoading, seteditPasienIsLoading] = useState(false);

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

  const editPasien = async (id: string, updatedData: Pasien) => {
    try {
      await axiosInstance.patch(`/pasien/${id}`, updatedData);
     return true;
    } catch (err) {
      console.error(err);
       return false;
    } finally {
      seteditPasienIsLoading(false);
    }
  };

  return { editPasien, editPasienIsLoading };
};