import { useState } from "react";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import ButtonComponent from "@/components/utility/Button";
const EditBookSale = ({ isEditinghandler }) => {
  const [formData, setFormData] = useState();

  const { fetchUserData } = useUser();

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
      await fetch("/api/business/updateBookSale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      fetchUserData();
      isEditinghandler();
    } catch (error) { }
  };

  return (
    <div className="sm:mt-0 mt-5 sm:w-96 w-full flex-shrink-0">

      <button className="" onClick={isEditinghandler}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>


      </button>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">

          <div>
            <label className="text-sm text-gray-700">Start date</label>
            <input
              name="date_starts"
              type="date"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">End date</label>
            <input
              name="date_ends"
              type="date"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Hours of the sale</label>
            <input
              name="hours"
              type="text"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Street Address</label>
            <input
              name="business_street"
              type="text"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg my-1 py-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">City</label>
            <input
              name="business_city"
              type="text"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg   my-1 py-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Zip Code</label>
            <input
              name="business_zip"
              type="text"
              className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  my-1 py-2"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mt-3 w-full">
          <ButtonComponent rounded full color="blue" type="submit">
            Submit
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default EditBookSale;
