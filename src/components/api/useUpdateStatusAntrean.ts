import { axiosInstance } from "../../components/lib/axios";
import { useState } from "react";

const useUpdateStatusAntrean = () => {
    
    const [isLoading, setIsLoading] = useState(false);

    interface AntreanPasien {
    status?: string;

    
}
    
    const updateStatusAntrean = async (id: string,
  updatedData: Partial<AntreanPasien>) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/antrean/${id}`, { updatedData });
            return true;
        } catch (error) {
            console.error("Error updating status antrean:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateStatusAntrean, isLoading };
}

export default useUpdateStatusAntrean;