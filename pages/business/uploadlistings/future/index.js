import { useEffect, useState } from "react";
import { useTableDataContext } from "../../../../context/TableDataContext";
import { setFutureTableDataToStorage } from "../../../../helpers/localstorage";
import BookSale from "../../../../components/BookSale";
import FutureListingComponent from "../../../../components/scoped/FutureListingComponent";
import { useUser } from "../../../../context/UserContext";

const Index = () => {
  const { user, fetchUserData } = useUser();
  const { bookSaleTableData, setBookSaleTableData } = useTableDataContext();
  const [error, setError] = useState("");

  const createNewRow = (newBookInfo) => {
    let { rows } = bookSaleTableData;

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
      ...bookSaleTableData,
      rows: [...rows],
    };

    setBookSaleTableData(newTableData);

    setFutureTableDataToStorage(newTableData);
  };

  const deleteBookRow = (ISBN) => {
    const newTableData = {
      ...bookSaleTableData,
      rows: bookSaleTableData.rows.filter((row) => row.isbn !== ISBN),
    };
    setBookSaleTableData(newTableData);

    setFutureTableDataToStorage(newTableData);
  };

  useEffect(() => {
    setError("");
  }, [bookSaleTableData]);

  if (!user?.booksale) {
    return <BookSale refreshUserData={fetchUserData} />;
  } else {
    return (
      <FutureListingComponent
        error={error}
        setError={setError}
        createNewRow={createNewRow}
        deleteBookRow={deleteBookRow}
        user={user}
      />
    );
  }
};

export default Index;
