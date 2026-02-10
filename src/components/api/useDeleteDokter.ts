import { axiosInstance } from "../lib/axios"
import { useState } from "react";



export const useDeleteDokter = () => {
  const [dokterIsLoading, setDokterIsLoading] = useState(false);

  const deleteDokter = async (id: string) => {
    try {
      await axiosInstance.delete(`/data-dokter/${id}`);
     return true;
    } catch (err) {
      console.error(err);
       return false;
    } finally {
      setDokterIsLoading(false);
    }
  };

  return { deleteDokter, dokterIsLoading };
};