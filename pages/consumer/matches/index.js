import { useState, useEffect } from "react";
import HeaderComponent from "@/components/customer/HeaderComponent";
import Loading from "@/components/utility/loading";
import Head from "next/head";
import { useUser } from "../../../context/UserContext";
import RenderMatches from "../../../components/customer/RenderMatches";
import RenderSaved from "../../../components/customer/RenderSaved";

const Matches = () => {
  const [active, setActive] = useState("all");

  const { user } = useUser();

  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  const [savedListings, setSavedListings] = useState([]);
  const [savedListingIds, setSavedListingIds] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("Fetching Matches");
      (async () => {
        await fetchMatches(user.consumer.id);
        await fetchSaved(user.consumer.id);
      })();
    }
  }, [user]);

  useEffect(() => {
    if (savedListings.length > 0) {
      const savedIds = savedListings.map((item) => item.listingId);
      setSavedListingIds(savedIds);
    }
  }, [savedListings]);

  const fetchMatches = async (consumerId) => {
    const response = await fetch(`/api/consumer/getMatches/${consumerId}`);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setMatches(data);
    setLoadingMatches(false);
  };

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

  const headers = [
    { title: "Store", width: "!min-w-[8rem]" },
    { title: "Library sale", width: "!min-w-[8rem]" },
    { title: "Date", width: "!min-w-[7rem]" },
    { title: "Zip Code", width: "!min-w-[7rem]" },
    { title: "", width: "!min-w-[4rem]" },
  ];

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

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else if (diffDays === 1) {
      return `1 day ago`;
    } else {
      return "Today";
    }
  };

  const loadingMessage = () => {
    if (loadingMatches === true) {
      return "Loading";
    }
  };

  const resultCount = () => {
    if (active === "all") {
      return matches.length > 0 ? matches.length : 0;
    } else if (active === "saved") {
      return savedListings.length > 0 ? savedListings.length : 0;
    } else {
      return filterMatches().length > 0 ? filterMatches().length : 0;
    }
  };

  const filterMatches = () => {
    const activeUppercase = active.toUpperCase();

    if (activeUppercase === "ALL") {
      return matches;
    }

    // Return only the items in the array where the reason matches the active tab
    return matches.filter((match) => match.reason === activeUppercase);
  };

  const tabs = [
    { id: "all", name: "All" },
    { id: "title", name: "Title" },
    { id: "authors", name: "Authors" },
    { id: "saved", name: "Saved" },
  ];

  const TabButton = ({ activeTab, setActiveTab, id, name }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`!mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${activeTab == id && "!text-black"
        }`}
      id={`pills-${id}-tab`}
      data-bs-toggle="pill"
      data-bs-target={`#pills-${id}`}
      type="button"
      role="tab"
      aria-controls={`pills-${id}`}
      aria-selected={activeTab == id}
    >
      {name}
    </button>
  );

  return (
    <div className="bg-[#FEFBE8] min-h-screen pb-32">
      <Head>
        <link rel="shortcut icon" href="/images/fav.png" />
      </Head>
      <div className="match-tab">
        <HeaderComponent />

        <section className="px-5 mt-4 sm:mt-6 border-t-2 border-black py-3">
          <div className="flex py-2 sm:py-6">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                name={tab.name}
                activeTab={active}
                setActiveTab={setActive}
              />
            ))}
          </div>

          <div>
            <p className="text-gray-900 text-base">
              {resultCount()} Results found
            </p>
          </div>
          <div className="">
            {loadingMatches ? (
              <div className="sm:flex justify-center pb-10">
                <div>
                  <p className="me-1">{loadingMessage()}</p>
                  <div className="pt-2.5">
                    <Loading />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {active !== "saved" && (
                  <div className="flex flex-wrap justify-center">
                    <RenderMatches
                      matches={filterMatches()}
                      headers={headers}
                      calculateDaysAgo={calculateDaysAgo}
                      consumerId={user ? user.consumer.id : ""}
                      refreshSaved={fetchSaved}
                      savedIds={savedListingIds}
                    />
                  </div>
                )}

                {active == "saved" && (
                  <RenderSaved
                    calculateDaysAgo={calculateDaysAgo}
                    consumerId={user ? user.consumer.id : ""}
                    arrayToMap={savedListings}
                    refreshSaved={fetchSaved}
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matches;
