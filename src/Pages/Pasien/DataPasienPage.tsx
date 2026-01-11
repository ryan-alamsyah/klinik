import FormPasien from "./FormPasien";
import TableListPasien from "./TableListPasien";

const DataPasienPage = () => {
  return (
    <>
      <div className="py-4">
        <FormPasien />
        <TableListPasien />
      </div>
    </>
  );
};

export default DataPasienPage;
