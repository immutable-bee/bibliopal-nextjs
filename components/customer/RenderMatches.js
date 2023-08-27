import saveListing from "../../utils/saveListing";
import unsaveListing from "../../utils/unsaveListing";

const RenderMatches = ({
  matches,
  headers,
  calculateDaysAgo,
  consumerId,
  refreshSaved,
  savedIds,
}) => {
  const saveAndRefresh = async (listingId) => {
    try {
      await saveListing(consumerId, listingId);
      await refreshSaved(consumerId);
    } catch (error) {}
  };

  const unsaveAndRefresh = async (listingId) => {
    try {
      await unsaveListing(consumerId, listingId);
      await refreshSaved(consumerId);
    } catch (error) {}
  };

  const savedIconHandler = (listingId) => {
    if (savedIds.includes(listingId)) {
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
    if (savedIds.includes(listingId)) {
      await unsaveAndRefresh(listingId);
    } else {
      await saveAndRefresh(listingId);
    }
  };

  return matches.map((data, i) => {
    const propertyName = Object.keys(data)[0];
    const listings = data[propertyName];
    return (
      <div
        className=" py-4 rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-[34rem] border-[#2eaaed]"
        key={i}
      >
        <div className="flex justify-between w-full px-4">
          <h4 className="text-black text-base font-medium">{propertyName}</h4>
          <p className="bg-[#2eaaed] px-3 py-1 text-xs text-white font-medium rounded-3xl">
            {data.reason}
          </p>
        </div>
        <div className="mt-2 flex w-full">
          <div className="w-full max-h-[11.5rem] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className={`${header.width} text-base font-medium leading-5 text-gray-600 text-left px-4 py-2`}
                    >
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-gray-900 text-sm px-4 py-2">
                      {item.owner.business_name}
                    </td>
                    <td className="text-gray-900 text-sm px-4 py-2">
                      {item.para2 ? (
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
                          ></path>
                          <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
                          <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
                          <path d="M5 8h4"></path>
                          <path d="M9 16h4"></path>
                          <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z"></path>
                          <path d="M14 9l4 -1"></path>
                          <path d="M16 16l3.923 -.98"></path>
                        </svg>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="text-gray-900 text-sm px-4 py-2">
                      {calculateDaysAgo(item.date_listed)}
                    </td>
                    <td className="text-gray-900 text-sm px-4 py-2">
                      {item.owner.business_zip}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={async () => saveButtonHandler(item.id)}
                        className="w-8 h-8 mx-1 bg-yellow-500 hover:bg-opacity-90 flex justify-center items-center border border-black rounded-md"
                      >
                        {savedIconHandler(item.id)}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });
};

export default RenderMatches;
