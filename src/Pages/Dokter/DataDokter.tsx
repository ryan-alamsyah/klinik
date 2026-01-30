import { useState } from "react";
import { SearchField } from "../../components/Ui/SearchField"


const DataDokter = () => {

    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
        <SearchField 
            label="Pencarian Jadwal Dokter"
            placeholder="Masukan Pencarian"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        
        </>
    )
}

export default DataDokter;