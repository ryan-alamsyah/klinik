import { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
 const hariIndo = [
    "Ahad" , "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", 
  ];
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen tidak lagi digunakan (unmount)
    return () => clearInterval(timer);
  }, []);

  // Mengambil data dari state currentDateTime
  const days = hariIndo[currentDateTime.getDay()];
  const day = currentDateTime.getDate();
  const month = bulanIndo[currentDateTime.getMonth()];
  const year = currentDateTime.getFullYear();
  
  // Memformat jam agar selalu dua digit (misal: 09:05:01)
  const hours = currentDateTime.getHours().toString().padStart(2, '0');
  const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <span>
        {`${days} , ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`}
      </span>
    </div>
  );
};

export default RealTimeClock;