import { useEffect, useState } from "react";
import { useTableDataContext } from "../../../../context/TableDataContext";
import { setTableDataToStorage } from "../../../../helpers/localstorage";

import FutureListingComponent from "../../../../components/scoped/FutureListingComponent";

const Index = () => {
  const { tableData, setTableData } = useTableDataContext();
  const [error, setError] = useState("");

  const createNewRow = (newBookInfo) => {
    let { rows } = tableData;

    const isISBNexist = rows.find((row) => row.isbn === newBookInfo.isbn);
    if (isISBNexist) return setError("This ISBN already exists");

    if (newBookInfo.title)
      rows.unshift({
        title: newBookInfo.title,
        author: newBookInfo.author || "",
        isbn: newBookInfo.isbn,
        format: newBookInfo.format || "",
        image_url: newBookInfo.image_url || "",
      });

    const newTableData = {
      ...tableData,
      rows: [...rows],
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  const deleteBookRow = (ISBN) => {
    const newTableData = {
      ...tableData,
      rows: tableData.rows.filter((row) => row.isbn !== ISBN),
    };
    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  useEffect(() => {
    setError("");
  }, [tableData]);

  return (
    <FutureListingComponent
      error={error}
      setError={setError}
      createNewRow={createNewRow}
      deleteBookRow={deleteBookRow}
    />
  );
};

export default Index;
