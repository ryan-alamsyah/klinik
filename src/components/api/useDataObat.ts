import { useState, useEffect } from "react"
import { axiosInstance } from "../lib/axios";

interface ObatResponse {
    id: string;
    namaObat: string;
    jmlhObat: string;
}


export const useDataObat = () => {
    const [obat, setObat] = useState<ObatResponse[]>([]);
    const [obatIsLoading, setObatIsLoading] = useState(false)

    const fetchDataObat = async () => {
        
        try {
            setObatIsLoading(true)
            const res = await axiosInstance.get<ObatResponse[]>("/obat");
            setObat(res.data);
        } catch (err) {
            console.log(err)
        } finally {
            setObatIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataObat();
      }, []);

      return {
        fetchDataObat,
        obat,
        obatIsLoading,
      };
};