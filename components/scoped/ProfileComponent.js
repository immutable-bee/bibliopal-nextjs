import { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
const ProfileComponent = ({ }) => {
    const router = useRouter();


    const [storeName, setStoreName] = useState("");
    const [storeType, setStoreType] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [physicalAddressSale, setPhysicalAddressSale] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hoursSale, setHoursSale] = useState("");
    const [url, setUrl] = useState("");
    const [autoUpload, setAutoUpload] = useState(false);
    const [displayContactInfo, setDisplayContactInfo] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [planOptions, setPlanOptions] = useState("Free");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            storeName,
            storeType,
            email,
            address,
            url,
            autoUpload,
            displayContactInfo,
            visibility,
            planOptions,
        });
    };

    const page = () => {
        // Define the routes to check
        const routes = ["/library", "/bookstore", "/thrift"];

        // Check if the current path includes any of the routes
        if (router.pathname.includes("/library")) {
            return "library";
        } else if (router.pathname.includes("/bookstore")) {
            return "bookstore";
        } else if (router.pathname.includes("/thrift")) {
            return "thrift";
        }

        // Return an empty string if none of the routes match
        return "";
    };
    return (
        <div className="min-h-screen bg-[#FEFBE8]">
            <Header />
            <div className="h-full flex flex-col items-center justify-center">
                <div className="max-w-xl w-full bg-whit px-4 sm:px-8 py-3 sm:py-6 rounded">
                    <h1 className="text-lg sm:text-2xl font-medium text-center ">
                        Profile Page
                    </h1>
                    <form onSubmit={handleSubmit} className="mt-2 sm:mt-6">
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Store name</label>
                            <input
                                type="text"
                                className="bg-white form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Store Type</label>
                            <select
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-select border border-gray-500 w-full rounded-lg  px-3 my-1 py-2"
                                value={storeType}
                                onChange={(e) => setStoreType(e.target.value)}
                            >
                                <option value="Thrift">Thrift</option>
                                <option value="Library">Library</option>
                                <option value="Bookstore">Bookstore</option>
                            </select>
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Email</label>
                            <input
                                type="email"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">Address</label>
                            <input
                                type="text"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="py-2">
                            <label className="text-sm text-gray-700">URL</label>
                            <input
                                type="url"
                                className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        {page() === 'library' ?
                            <>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Physical address of the sale</label>
                                    <input
                                        type="text"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={physicalAddressSale}
                                        onChange={(e) => setPhysicalAddressSale(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Start date</label>
                                    <input
                                        type="date"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">End date</label>
                                    <input
                                        type="date"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="py-2">
                                    <label className="text-sm text-gray-700">Hours of the sale</label>
                                    <input
                                        type="text"
                                        className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                                        value={hoursSale}
                                        onChange={(e) => setHoursSale(e.target.value)}
                                    />
                                </div>
                            </>
                            : ''}


                        <label className="relative mt-6 flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={autoUpload}
                                onChange={() => setAutoUpload(!autoUpload)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Auto upload
                            </span>
                        </label>
                        <label className="relative mt-6 flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={displayContactInfo}
                                onChange={() => setDisplayContactInfo(!displayContactInfo)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Display contact info
                            </span>
                        </label>

                        <div className="mt-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="bg-white form-checkbox ml-1 rounded-md h-6 w-6 text-[#2EAAED]"
                                    checked={visibility}
                                    onChange={() => setVisibility(!visibility)}
                                />
                                <span className="ml-6 text-gray-700">30-day visibility</span>
                            </label>
                        </div>

                        {/* <div className='mt-4'>
      <span className="text-lg text-gray-900 font-medium">Plan options:</span>
      <div className="mt-2">
          <label className="flex items-center py-1.5">
              <input type="radio" className="bg-white form-radio h-6 w-6 text-[#2EAAED]" value="Free" checked={planOptions === 'Free'} onChange={() => setPlanOptions('Free')} />
              <span className="ml-2 text-gray-700">Free</span>
          </label>
          <label className="flex items-center py-1.5">
              <input type="radio" className="bg-white form-radio h-6 w-6 text-[#2EAAED]" value="Tier 1" checked={planOptions === 'Tier 1'} onChange={() => setPlanOptions('Tier 1')} />
              <span className="ml-2 text-gray-700">Tier 1</span>
          </label>
          <label className="flex items-center py-1.5">
              <input type="radio" className="bg-white form-radio h-6 w-6 text-[#2EAAED]" value="Tier 2" checked={planOptions === 'Tier 2'} onChange={() => setPlanOptions('Tier 2')} />
              <span className="ml-2 text-gray-700">Tier 2</span>
          </label>
      </div>
  </div> */}
                        <div className="mt-4">
                            <button
                                onClick={() => alert("Manage Subscription")}
                                className=" w-full hover:opacity-90 bg-[#2EAAED] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
                            >
                                Manage Subscription
                            </button>

                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => alert("Manage Subscription")}
                                type="submit"
                                className=" w-full hover:opacity-90 bg-[#2EAAED] px-3 py-2.5 rounded-3xl border-2 text-white border-black"
                            >
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
