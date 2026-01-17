import { axiosInstance } from "../lib/axios"
import { useState } from "react";



export const useDeletePasien = () => {
  const [pasienIsLoading, setPasienIsLoading] = useState(false);

  const deletePasien = async (id: string) => {
    try {
      await axiosInstance.delete(`/pasien/${id}`);
     return true;
    } catch (err) {
      console.error(err);
       return false;
    } finally {
      setPasienIsLoading(false);
    }
  };

  return { deletePasien, pasienIsLoading };
};