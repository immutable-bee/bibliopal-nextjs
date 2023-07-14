import { useState, useEffect } from "react";
import styles from "./home.module.scss";
// import Image from 'next/image';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import Inputcomponent from "@/components/customer/Inputcomponent";
import HeaderComponent from "@/components/customer/HeaderComponent";
import Loading from "../../components/utilities/Loading";

// import ProfileComponent from '@/components/customer/ProfileComponent';
const Home = () => {
  const [loadingListings, setLoadingListings] = useState(false);
  const [listings, setListings] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className="bg-[#FEFBE8] h-screen">
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

          <div className="sm:flex flex-wrap justify-center">
            {loadingListings || loadingSearchResults ? (
              <div className="sm:flex pb-10">
                <p className="me-1">{loadingMessage()}</p>
                <div className="pt-2.5">
                  <Loading />
                </div>
              </div>
            ) : (
              arrayToMap.map((data, i) => {
                return (
                  <div
                    className="px-4 py-4 cursor-pointer hover:opacity-80 flex rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-96 border-[#2eaaed]"
                    key={data.id}
                  >
                    {/*<div className="bg-[#ffc71f] w-24 mr-3 rounded-lg"></div>*/}
                    <div className="w-24 mr-3 rounded-lg">
                      <img src={data.image_url} alt="" />
                    </div>
                    <div className="w-full mb-3 ">
                      <h3 className="text-black text-lg font-semibold">
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
                        {calculateDaysAgo(data.date_listed)}
                      </h6>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
