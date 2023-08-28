import { useState, useEffect } from "react";
import Inputcomponent from "@/components/customer/Inputcomponent";
import HeaderComponent from "@/components/customer/HeaderComponent";
import TooltipComponent from "@/components/utility/Tooltip";
import Loading from "../../components/utility/loading";
import PaginationComponent from "../../components/utility/Pagination";
import saveListing from "../../utils/saveListing";
import unsaveListing from "../../utils/unsaveListing";
import { useUser } from "../../context/UserContext";
import BookSaleTooltip from "../../components/customer/BookSaleTooltip";
const Home = () => {
  const { user } = useUser();

  const [consumerId, setConsumerId] = useState("");

  const [loadingListings, setLoadingListings] = useState(false);
  const [listings, setListings] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchZipCode, setSearchZipCode] = useState("");
  const [filter, setFilter] = useState("title");

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // pagination

  const [inventoryMatchesPage, setInventoryMatchesPage] = useState(1);

  const [savedListings, setSavedListings] = useState([]);
  const [savedListingIds, setSavedListingIds] = useState([]);

  const fetchSaved = async (consumerId) => {
    const response = await fetch(
      `/api/consumer/getSavedListings/${consumerId}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setSavedListings(data);
  };

  const saveAndRefresh = async (listingId) => {
    try {
      await saveListing(consumerId, listingId);
      await fetchSaved(consumerId);
    } catch (error) { }
  };

  const unsaveAndRefresh = async (listingId) => {
    try {
      await unsaveListing(consumerId, listingId);
      await fetchSaved(consumerId);
    } catch (error) { }
  };

  const savedIconHandler = (listingId) => {
    if (savedListingIds.includes(listingId)) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-bookmark stroke-white w-6 h-6"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-bookmark stroke-white w-6 h-6"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
        </svg>
      );
    }
  };

  const saveButtonHandler = async (listingId) => {
    if (savedListingIds.includes(listingId)) {
      await unsaveAndRefresh(listingId);
    } else {
      await saveAndRefresh(listingId);
    }
  };

  const openRequestsItemsPerPage = 7;

  const paginateData = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };
  // pagination end

  const calculateDaysAgo = (dateListed) => {
    const listedDate = new Date(dateListed);

    const currentDate = new Date();

    const diffTime = Math.abs(currentDate - listedDate);

    // Calculate the difference in days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // If the difference is more than one day, return it as "x days ago"
    // If it's exactly one day, return "1 day ago"
    // Else if it's less than a day, return "Today"
    if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else if (diffDays === 1) {
      return `1 day ago`;
    } else {
      return "Today";
    }
  };

  const fetchListings = async () => {
    const res = await fetch("/api/fetch-listings");

    if (res.status === 200) {
      const data = await res.json();
      setListings(data);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoadingListings(true);
      await fetchListings();
      await fetchSaved(user.consumer.id);
      setConsumerId(user.consumer.id);
      setLoadingListings(false);
    };
    if (user) {
      initialFetch();
    }
  }, [user]);

  useEffect(() => {
    if (savedListings.length > 0) {
      const savedIds = savedListings.map((item) => item.listingId);
      setSavedListingIds(savedIds);
    }
  }, [savedListings]);

  const fetchSearchResults = async () => {
    setLoadingSearchResults(true);
    const res = await fetch("/api/fetch-searchResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm, filter, searchZipCode }),
    });

    if (res.status === 200) {
      const data = await res.json();
      setSearchResults(data);
      setLoadingSearchResults(false);
    }
  };

  const loadingMessage = () => {
    if (loadingListings === true) {
      return "Loading";
    } else if (loadingSearchResults === true) {
      return "Searching";
    }
  };

  const arrayToMap = searchResults.length > 0 ? searchResults : listings;

  const resultCount =
    searchResults.length > 0 ? searchResults.length : listings.length;

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <HeaderComponent />
      <Inputcomponent
        handleSearch={fetchSearchResults}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchZipCode={searchZipCode}
        setSearchZipCode={setSearchZipCode}
      />

      <section className="px-3 sm:px-5 mt-6 border-t-2 border-black py-3">
        <div className="">
          <div>
            <p className="text-gray-900 text-base">
              {resultCount} Results found
            </p>
          </div>

          <div className="">
            {loadingListings || loadingSearchResults ? (
              <div className="sm:flex justify-center pb-10">
                <div>
                  <p className="me-1">{loadingMessage()}</p>
                  <div className="pt-2.5">
                    <Loading />
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="sm:flex flex-wrap justify-center">
                  {arrayToMap.map((data, i) => {
                    return (
                      <div
                        style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}
                        className="px-4 py-4 relative rounded-3xl sm:mx-3 sm:my-3 my-5 w-full sm:w-96"
                        key={data.id}
                      >
                        <div className="flex">
                          <div className="w-24 flex-shrink-0 mr-3 rounded-lg">
                            <img
                              src={data.image_url}
                              className="rounded"
                              alt=""
                            />
                          </div>
                          <div className="w-full mb-3 ">
                            <h3 className="text-black h-14 overflow-y-auto text-lg font-semibold">
                              {data.title}
                            </h3>
                            <p className=" mb-3 text-gray-800 text-base leading-5">
                              {data.author}
                            </p>
                            <p className="text-gray-800 text-base leading-5">
                              {data?.owner?.business_name}
                            </p>
                            <label className="text-gray-500 text-base">
                              Zip Code: {data?.owner?.business_zip}
                            </label>
                            <h6 className="text-sm absolute bottom-3 right-3 text-gray-500 text-right">
                              {data.date_listed
                                ? calculateDaysAgo(data.date_listed)
                                : "1 day ago"}
                            </h6>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          {data.booksale && <BookSaleTooltip listing={data} />}
                          <TooltipComponent
                            rounded
                            placement="rightStart"
                            width="!w-28"
                            id="shipping-status-tooltip"
                            css={{ zIndex: 10000 }}
                            content={"Add to Saved"}
                          >
                            <button
                              onClick={async () => saveButtonHandler(data.id)}
                              className="w-8 h-8 mx-1 bg-yellow-500 hover:bg-opacity-90 flex justify-center items-center border border-black rounded-md"
                            >
                              {savedIconHandler(data.id)}
                            </button>
                          </TooltipComponent>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  id="inventory-matches-pagination"
                  className="flex justify-center"
                >
                  {arrayToMap?.length > 0 && !loadingListings && (
                    <PaginationComponent
                      total={Math.ceil(
                        arrayToMap.length / openRequestsItemsPerPage
                      )}
                      current={inventoryMatchesPage}
                      onChange={(page) => setInventoryMatchesPage(page)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
