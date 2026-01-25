import { axiosInstance } from "../lib/axios";
import { useState } from "react";


interface RekamMedis {
    id: string;
    pasienId: string;
    namaPasien: string;
    diagnosa: string;
    tindakan: string;
    obat: string;
    tanggalKunjungan: string;
}

const useRekamMedisPasien = () => {
    const [rekamMedis, setRekamMedis] = useState<RekamMedis[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRekamMedis = async (pasienId: string) => {

        try {
            setLoading(true);
            const res = await axiosInstance.get(`/rekam-medis/pasien/${pasienId}`);
            setRekamMedis(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        rekamMedis,
        loading,
        fetchRekamMedis
    }
}

export default useRekamMedisPasien;