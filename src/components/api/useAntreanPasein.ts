import { useEffect, useState } from "react"
import { axiosInstance } from "../lib/axios"


interface AntreanPasien {
    id: string;
    pasienId: string;
    nomorAntrean: string
    name: string;
    gender: string;
    selectedPoli: string;
    status?: string;
    
}


export const useAntreanPasien = () => {
    const [antreanPasien, setAntreanPasien ] = useState<AntreanPasien>();
    const [pasienIsLoading, setPasienIsLoading] = useState(false);
    const fetchAntreanPasien =  async() => {
        try {
             setPasienIsLoading(true);
         const responses = await axiosInstance.get("/antrean")
            setAntreanPasien(responses.data)
        } catch (error) {
            console.log(error)
        } finally {
 setPasienIsLoading(false);
        }
    }

    useEffect(() => {
fetchAntreanPasien();
    }, []);

    return {
        fetchAntreanPasien,
        antreanPasien,
        pasienIsLoading
    }
}