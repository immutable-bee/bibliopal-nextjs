import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Image from "next/image";
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import Inputcomponent from "@/components/customer/Inputcomponent";
import HeaderComponent from "@/components/customer/HeaderComponent";
import TooltipComponent from "@/components/utility/Tooltip";
import Loading from "../../components/utility/loading";
import PaginationComponent from "../../components/utility/Pagination";
// import ProfileComponent from '@/components/customer/ProfileComponent';
const Home = () => {
  const [loadingListings, setLoadingListings] = useState(false);
  const [listings, setListings] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // pagination

  const [inventoryMatchesPage, setInventoryMatchesPage] = useState(1);

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
      setLoadingListings(false);
    };
    initialFetch();
  }, []);

  const fetchSearchResults = async () => {
    setLoadingSearchResults(true);
    const res = await fetch("/api/fetch-searchResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm, filter }),
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

  const testData = [
    {
      id: 1,
      image_url: "",
      title: "test title",
      author: "test author",
      ownerId: "test store",
    },
    {
      id: 2,
      image_url: "",
      title: "test title",
      author: "test author",
      ownerId: "test store",
    },
    {
      id: 3,
      image_url: "",
      title: "test title",
      author: "test author",
      ownerId: "test store",
    },
    {
      id: 4,
      image_url: "",
      title: "test title",
      author: "test author",
      ownerId: "test store",
    },
    {
      id: 5,
      image_url: "",
      title: "test title",
      author: "test author",
      ownerId: "test store",
    },
  ];

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <HeaderComponent />
      <Inputcomponent
        handleSearch={fetchSearchResults}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <section className="px-2 sm:px-5 mt-6 border-t-2 border-black py-3">
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
                  {testData.map((data, i) => {
                    return (
                      <div
                        className="px-4 py-4 rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-96 border-[#2eaaed]"
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
                            <p className="text-gray-800 text-base leading-5">
                              {data.author}
                            </p>
                            <p className="text-gray-800 text-base leading-5">
                              {data.ownerId}
                            </p>
                            <label className="text-gray-500 text-base">
                              Zip Code: 59901
                            </label>
                            <h6 className="text-sm text-gray-500 text-right">
                              {data.date_listed
                                ? calculateDaysAgo(data.date_listed)
                                : "1 day ago"}
                            </h6>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <TooltipComponent
                            rounded
                            placement="rightStart"
                            width="!w-24"
                            id="shipping-status-tooltip"
                            css={{ zIndex: 10000 }}
                            content={
                              'Library Sale'
                            }
                          >
                            <span className="w-8 h-8 mx-1 bg-yellow-5000 flex justify-center items-center border border-blue-600 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-books stroke-black w-6 h-6"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                                <path d="M5 8h4" />
                                <path d="M9 16h4" />
                                <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                                <path d="M14 9l4 -1" />
                                <path d="M16 16l3.923 -.98" />
                              </svg>
                            </span>
                          </TooltipComponent>
                          <TooltipComponent
                            rounded
                            placement="rightStart"
                            width="!w-28"
                            id="shipping-status-tooltip"
                            css={{ zIndex: 10000 }}
                            content={
                              'Add to Saved'
                            }
                          >
                            <button className="w-8 h-8 mx-1 bg-yellow-500 hover:bg-opacity-90 flex justify-center items-center border border-black rounded-md">
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
                              </svg>
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
