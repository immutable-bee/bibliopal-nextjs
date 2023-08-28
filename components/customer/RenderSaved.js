import TooltipComponent from "../utility/Tooltip";
import unsaveListing from "../../utils/unsaveListing";
import BookSaleTooltip from "./BookSaleTooltip";

const RenderSaved = ({
  arrayToMap,
  calculateDaysAgo,
  consumerId,
  refreshSaved,
}) => {
  const removeSavedListing = async (listingId) => {
    try {
      await unsaveListing(consumerId, listingId);
      await refreshSaved(consumerId);
    } catch (error) { }
  };

  return (
    <div className="sm:flex flex-wrap justify-center">
      {arrayToMap.map((data, i) => {
        return (
          <div
            style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}
            className="px-4 py-4 relative rounded-3xl border sm:mx-3 sm:my-3 my-5 w-full sm:w-96"
            key={data.id}
          >
            <div className="flex">
              <div className="w-24 flex-shrink-0 mr-3 rounded-lg">
                <img src={data.listing.image_url} className="rounded" alt="" />
              </div>
              <div className="w-full mb-3 ">
                <h3 className="text-black h-14 overflow-y-auto text-lg font-semibold">
                  {data.listing.title}
                </h3>
                <p className=" mb-3 text-gray-800 text-base leading-5">
                  {data.listing.author}
                </p>
                <p className="text-gray-800 text-base leading-5">
                  {data.listing.owner.business_name}
                </p>
                <label className="text-gray-500 text-base">
                  Zip Code: {data.listing.owner.business_zip}
                </label>
                <h6 className="text-sm absolute bottom-3 right-3 text-gray-500 text-right">
                  {data.listing.date_listed
                    ? calculateDaysAgo(data.listing.date_listed)
                    : "1 day ago"}
                </h6>
              </div>
            </div>
            <div className="flex justify-center">
              {data.listing.booksale && (
                <BookSaleTooltip listing={data.listing} />
              )}
              <TooltipComponent
                rounded
                placement="rightStart"
                width="!w-28"
                id="saved-status-tooltip"
                css={{ zIndex: 10000 }}
                content={"Remove from saved"}
              >
                <button
                  onClick={async () => removeSavedListing(data.listing.id)}
                  className="w-8 h-8 mx-1 bg-yellow-500 hover:bg-opacity-90 flex justify-center items-center border border-black rounded-md"
                >
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
                </button>
              </TooltipComponent>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderSaved;
