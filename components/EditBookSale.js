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
    <div className="">
      <div className="ml-96 absolute">
        <button className="ml-10" onClick={isEditinghandler}>
          <Image
            src={"/images/icons/icon-pencil.svg"}
            width={20}
            height={20}
            alt="Edit Book Sale Icon"
            className=""
          />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

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

        <div className="mt-5">
          <ButtonComponent rounded full color="blue" type="submit">
            Submit
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default EditBookSale;
