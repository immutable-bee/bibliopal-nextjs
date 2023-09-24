import { Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TooltipComponent from "@/components/utility/Tooltip";
import HeaderComponent from "@/components/customer/HeaderComponent";
import BookSaleTooltip from "../../../components/customer/BookSaleTooltip";
import saveListing from "../../../utils/saveListing";
import unsaveListing from "../../../utils/unsaveListing";
import { useUser } from "../../../context/UserContext";
import Image from "next/image";
import * as notify from "../../api/notifier/notify";

const ListingCards = ({ listings, savedIconHandler, saveButtonHandler }) => {
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

  return (
    <div className="sm:flex flex-wrap justify-center">
      {listings.map((data, i) => {
        return (
          <div
            style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
            className="px-4 py-4 relative rounded-3xl sm:mx-3 sm:my-3 my-5 w-full sm:w-96"
            key={data.id}
          >
            <div className="flex">
              <div className="w-24 flex-shrink-0 mr-3 rounded-lg">
                <img src={data.image_url} className="rounded" alt="" />
              </div>
              <div className="w-full mb-3 ">
                <h3 className="text-black h-14 overflow-y-auto text-lg font-semibold">
                  {data.title}
                </h3>
                <p className=" mb-3 text-gray-800 text-base leading-5">
                  {data.author}
                </p>

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
  );
};

const StorePage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [storeData, setStoreData] = useState(null);
  const [storeListings, setStoreListings] = useState([]);

  const [savedListings, setSavedListings] = useState([]);
  const [savedListingIds, setSavedListingIds] = useState([]);

  const { storeId } = router.query;

  const fetchStoreData = async (id) => {
    try {
      const response = await fetch(`/api/consumer/getStoreData/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch store data.");
      }

      const store = await response.json();
      setStoreData(store.data);
      setStoreListings(store.listings);
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSaved = async () => {
    const response = await fetch(
      `/api/consumer/getSavedListings/${user.consumer.id}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setSavedListings(data);
  };

  useEffect(() => {
    if (storeId) {
      fetchStoreData(storeId);
    }
  }, [router.query]);

  useEffect(() => {
    if (user) {
      fetchSaved(user.consumer.id);
    }
  }, [user]);

  useEffect(() => {
    if (savedListings.length > 0) {
      const savedIds = savedListings.map((item) => item.listingId);
      setSavedListingIds(savedIds);
    }
  }, [savedListings]);

  const saveAndRefresh = async (listingId) => {
    try {
      await saveListing(user.consumer.id, listingId);
      await fetchSaved(user.consumer.id);
    } catch (error) {
      notify.error(error);
    }
  };

  const unsaveAndRefresh = async (listingId) => {
    try {
      await unsaveListing(user.consumer.id, listingId);
      await fetchSaved(user.consumer.id);
    } catch (error) {
      notify.error(error);
    }
  };

  const saveButtonHandler = async (listingId) => {
    if (savedListingIds.includes(listingId)) {
      await unsaveAndRefresh(listingId);
    } else {
      await saveAndRefresh(listingId);
    }
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

  return (
    <div className="bg-[#FEFBE8] min-h-screen">
      <HeaderComponent />
      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loading size={"lg"} />
        </div>
      ) : !storeData ? (
        <h6>No store found</h6>
      ) : (
        <div>
          <div className="">
            <div className="flex pt-10 pb-5 justify-center gap-4 border-b  border-black">
              <div>
                <Image
                  width={150}
                  height={150}
                  src={"/images/bookstore-img.svg"}
                  alt={"Bookstore Image"}
                  className="!h-full"
                />
              </div>
              <div className="flex flex-col ">
                <h6 className="text-lg font-semibold pb-2">
                  {storeData.business_name}
                </h6>
                <h6>
                  {storeData.business_street}, {storeData.business_city}
                </h6>
                <h6 className="pb-3">
                  {storeData.business_state}, {storeData.business_zip}
                </h6>
                {storeData.url && (
                  <a
                    href={`https://${storeData.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500"
                  >
                    {" "}
                    {storeData.url}
                  </a>
                )}
                <h6></h6>
              </div>
            </div>
          </div>
          {storeListings.length > 0 ? (
            <ListingCards
              listings={storeListings}
              saveButtonHandler={saveButtonHandler}
              savedIconHandler={savedIconHandler}
            />
          ) : (
            <div className="flex justify-center mt-10">
              <h6>Store does not have any listings</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StorePage;
