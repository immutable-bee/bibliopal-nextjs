import { Flex, Stack, Text, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { ErrorT, SetError } from "../pages/business/index";

interface ISBNSearchBoxProps {
  setError: SetError;
  error: ErrorT;
  createNewRow: Function;
}

const ISBNSearchBox = ({
  createNewRow,
  error,
  setError,
}: ISBNSearchBoxProps) => {
  const { fetchByISBN } = useFetchBooks();
  const [searchValue, setSearchValue] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!searchValue) {
      setError("Please write book ISBN");
      return;
    }

    const bookData = await fetchByISBN(searchValue, setError);

    console.log(bookData);

    if (!bookData) return;
    setSearchValue("");

    return createNewRow(bookData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(" ", ""));
  };

  const handlePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") handleSearch();
  };

  return (
    <div>
      <h1 className="text-gray-900 text-2xl sm:text-3xl sm:text-center font-bold">
        Book Listing Application
      </h1>
      <div className="pt-10">
        <div className="sm:flex items-center">
          <label className="text-2xl block sm:inline-block text-black font-bold">
            EAN
          </label>
          <input
            ref={searchInputRef}
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handlePress}
            type="url"
            className="bg-white sm:ml-3 w-80 focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-300  rounded-lg  px-4 my-1 py-3.5"
          />
        </div>
        <p className="text-base mt-1 text-red-500 text-center">{error}</p>
      </div>
    </div>
  );
};

export default ISBNSearchBox;
