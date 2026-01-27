import { axiosInstance } from "../../components/lib/axios";
import { useState } from "react";

const useUpdateStatusAntrean = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    
    const updateStatusAntrean = async (id: string, status: string) => {
        setIsLoading(true);
        try {
            await axiosInstance.patch(`/antrean/${id}`, { status });
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