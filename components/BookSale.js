import Header from "@/components/Header";
import { useState } from "react";
import ButtonComponent from "@/components/utility/Button";
const BookSale = () => {
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Convert to a Date object if the name is date_starts or date_ends
    if (name === "date_starts" || name === "date_ends") {
      processedValue = new Date(value);
    }

    setFormData({ ...formData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/business/createBookSale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchUserData();
    } catch (error) { }
  };

  return (
    <div className="min-h-screen bg-[#FEFBE8]">
      <Header />
      <div className="border-t border-black">

        <div className="flex justify-center mt-8 mb-5">
          <p className="text-center text-base max-w-lg px-5">
            You can use this page to schedule future book sales. Simply fill out
            the form below to create your booksale and then start adding
            listings. You will be able to update your book sale information at
            any time.
          </p>
        </div>
        <div className="max-w-lg mx-auto w-full bg-whit px-4 sm:px-8 rounded">
          <form onSubmit={handleSubmit} className="">
            <div className="">
              <div className="py-2 w-full">
                <label className="text-sm text-gray-700">Start date</label>
                <input
                  name="date_starts"
                  type="date"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={handleChange}
                />
              </div>
              <div className="py-2 w-full">
                <label className="text-sm text-gray-700">End date</label>
                <input
                  name="date_ends"
                  type="date"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={handleChange}
                />
              </div>
              <div className="py-2">
                <label className="text-sm text-gray-700">Hours of the sale</label>
                <input
                  name="hours"
                  type="text"
                  className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                  onChange={handleChange}
                />
              </div>
              <div className="py-2">
                <label className="relative flex cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={useDefaultAddress}
                    onChange={(e) => setUseDefaultAddress(!useDefaultAddress)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
                  <span className="ml-3 text-sm font-medium ">
                    Use Default Address?
                  </span>
                </label>
              </div>
            </div>
            {!useDefaultAddress && (
              <div className="flex flex-col w-1/5">
                <div className="py-2">
                  <label className="text-sm text-gray-700">Street Address</label>
                  <input
                    name="business_street"
                    type="text"
                    className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-evenly gap-4">
                  <div className="py-2">
                    <label className="text-sm text-gray-700">City</label>
                    <input
                      name="business_city"
                      type="text"
                      className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-sm text-gray-700">Zip Code</label>
                    <input
                      name="business_zip"
                      type="text"
                      className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="my-3">
              <ButtonComponent rounded full color="blue" type="submit">
                Submit
              </ButtonComponent>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BookSale;
