import { useEffect, useState } from "react"
import { axiosInstance } from "../../components/lib/axios";


interface DokterResponse {
    id: string;
    nameDokter: string;
    NIK: string;
    tempatLahir: string;
    tglLahir: string;
    gender: string;
    tlp: string;
    nmrSTR: string;
    npwp: string;
    jadwalPraktek: string;
    poli: string;
    foto: string;
}

export const useDataDokter = () => {

    const [dokter, setDokter] = useState<DokterResponse[]>([]);
    const [dokterIsLoading, setDokterIsLoading] = useState(false);

    const fetchDokter = async () => {
        try {
            setDokterIsLoading(true);
            const res = await axiosInstance.get<DokterResponse[]>('/data-dokter');
            setDokter(res.data);
        } catch(err) {
            console.log(err)
        } finally {
            setDokterIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDokter();
    }, []);

    return {
fetchDokter,
dokter,
dokterIsLoading
    }
}