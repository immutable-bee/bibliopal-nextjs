import { useEffect, useRef, useState } from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { ErrorT, SetError } from "../pages/business/index";
import Image from "next/image";

interface ISBNSearchBoxProps {
  setError: SetError;
  error: ErrorT;
  createNewRow: Function;
  title: String;
}

const ISBNSearchBox = ({
  createNewRow,
  error,
  setError,
  title,
}: ISBNSearchBoxProps) => {
  const { fetchByISBN } = useFetchBooks();
  const [searchValue, setSearchValue] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSaleHandler = () => {
    return title === "Schedule Listings" ? true : false;
  };

  const handleSearch = async () => {
    if (!searchValue) {
      setError("Please write book ISBN");
      return;
    }

    const bookData = await fetchByISBN(searchValue, isSaleHandler(), setError);

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

  const fetchButtonHandler = () => {
    handleSearch();
  };

  const fetchButtonColor = searchValue ? "[#9BCC2C]" : "biblioSeafoam";

  return (
    <div>
      <h1 className="text-gray-900 text-2xl sm:text-3xl sm:text-center font-bold">
        {title}
      </h1>
      <div className="pt-5">
        <div className="flex flex-row">
          <div className="sm:flex items-center">
            <label className="md:text-2xl block sm:inline-block text-black font-bold">
              EAN
            </label>
            <input
              ref={searchInputRef}
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handlePress}
              type="url"
              className="bg-white md:ml-5 ml-10 md:w-80  focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-300  rounded-lg  px-4 my-1 py-3.5"
            />
            <button
              onClick={fetchButtonHandler}
              disabled={searchValue ? false : true}
              className={`md:ml-2 ml-5 px-2 py-2 bg-${fetchButtonColor} rounded-full`}
            >
              <Image
                src={"/images/icons/icon-arrowRight.svg"}
                width={24}
                height={24}
                alt="Add listing button"
              />
            </button>
          </div>
          <p className="text-base mt-1 text-red-500 text-center">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ISBNSearchBox;
