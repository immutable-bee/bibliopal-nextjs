import TooltipComponent from "../utility/Tooltip";

const RenderSaved = ({ arrayToMap, calculateDaysAgo, consumerId }) => {
  return (
    <div className="sm:flex flex-wrap justify-center">
      {arrayToMap.map((data, i) => {
        return (
          <div
            className="px-4 py-4 relative rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-96 border-[#2eaaed]"
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
              <TooltipComponent
                rounded
                placement="rightStart"
                width="!w-24"
                id="shipping-status-tooltip"
                css={{ zIndex: 10000 }}
                content={"Library Sale"}
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                content={"Add to Saved"}
              >
                <button
                  onClick={async () =>
                    saveListing(user ? user.consumer.id : "", data.id)
                  }
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
                    fill="none"
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
