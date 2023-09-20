import { Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { ActionIcon } from "@mantine/core";
import { Delete } from "../../../assets/svg/delete";

const SearchListings = ({ searchTerm, setSearchTerm, setFilter }) => {
  const [active, setActive] = useState("Title");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleActiveChange = (newActive) => {
    setActive(newActive);
    setFilter(newActive.toLowerCase());
  };

  return (
    <div className="flex py-5 px-2 justify-center w-full items-center">
      <div className="w-3/4 px-3 max-w-6xl border-none rounded-3xl">
        <div className=" sm:flex justify-between">
          <input
            type="text"
            className=" px-6 rounded-full py-3 sm:py-4 border w-full focus:outline-none"
            placeholder=""
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <div className="flex items-center justify-end mt-2 sm:mt-0">
            <ul className=" flex items-center ml-2">
              <button
                onClick={() => handleActiveChange("Title")}
                className={`  rounded-full px-6 sm:px-10 font-medium sm:font-semibold py-1 sm:py-2   ${
                  active == "Title" && "!bg-[#978367] !text-white"
                } `}
                id="pills-all-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-all"
                type="button"
                role="tab"
                aria-controls="pills-all"
                aria-selected="true"
              >
                Title
              </button>
              <button
                onClick={() => handleActiveChange("Author")}
                className={`  rounded-full px-6 sm:px-10 font-medium sm:font-semibold py-1 sm:py-2   ${
                  active == "Author" && "!bg-[#978367] !text-white"
                } `}
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Author
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead className="text-base font-semibold text-gray-700   ">
      <tr>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Title
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Author
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          Format
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        >
          ISBN
        </th>
        <th
          scope="col"
          className=" border-2 border-[rgb(222, 226, 230)] px-6 py-3"
        ></th>
      </tr>
    </thead>
  );
};

const TableBody = ({ listings, deleteListing }) => {
  const handleDelete = (ISBN) => deleteListing(ISBN);

  return (
    <tbody className="border-2 text-gray-700 text-xs sm:text-sm font-light border-[rgb(222, 226, 230)]">
      {listings.map((row) => (
        <tr className=" border-b  " key={row.isbn}>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.title}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.author}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.format}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {row?.isbn}
          </td>
          <td className="border-2 border-[rgb(222, 226, 230)] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            <ActionIcon onClick={() => handleDelete(row?.id)}>
              <Delete />
            </ActionIcon>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");

  const filteredListings = listings.filter((listing) => {
    if (!searchTerm) return true;

    switch (filter) {
      case "title":
        return listing.title.toLowerCase().includes(searchTerm.toLowerCase());
      case "author":
        return listing.author.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const deleteListing = async (id) => {
    const response = await fetch("/api/business/deleteListing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingID: id }),
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    await fetchListings();
    return data;
  };

  const fetchListings = async () => {
    const response = await fetch("/api/business/getActiveListings");

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = await response.json();

    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <Header />
      <div className=" border-t border-black w-full ">
        <div>
          {loading ? (
            <div className="flex justify-center">
              <Loading size={"lg"} className="mt-20 ml-1/2" />
            </div>
          ) : listings.length < 1 ? (
            <div className="flex justify-center">
              <h6 className="mt-20 text-lg">
                You do not have any active listings
              </h6>
            </div>
          ) : (
            <div className="flex flex-col  mt-2 w-full px-0">
              <div className="flex">
                <h6 className="ml-2 px-2 w-1/4">
                  Total Listings: {listings.length}
                </h6>
                <SearchListings
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setFilter={setFilter}
                />
              </div>
              <div className="relative mx-10 mt-6 overflow-x-auto">
                <table className="w-full rounded-lg border-2 border-[rgb(222, 226, 230)]  text-sm text-left text-gray-500 ">
                  <TableHead />
                  <TableBody
                    listings={filteredListings}
                    deleteListing={deleteListing}
                  />
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageListings;
