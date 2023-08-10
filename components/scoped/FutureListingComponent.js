import { useState } from "react";
import Header from "@/components/Header";

import Actions from "@/components/Actions";
import ISBNSearchBox from "@/components/ISBNSearchBox";
import ContentTable from "@/components/ContentTable";
import Image from "next/image";
const FutureListingComponent = ({
  error,
  setError,
  createNewRow,
  deleteBookRow,
  user,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#FEFBE8]">
      <Header />
      <div className=" px-3 sm:px-8 py-3 sm:py-4 mx-auto">
        <div className="px-3 sm:px-0 border border-black rounded-2xl">
          <div className="flex justify-around  w-full  py-8 mx-auto">
            <div className="">
              <ISBNSearchBox
                error={error}
                setError={setError}
                createNewRow={createNewRow}
              />

              <Actions isSale={true} />
            </div>
            {isEditing ? null : (
              <div className="">
                <div className="flex">
                  <h6 className="text-lg font-bold">BookSale Info</h6>
                  <button onClick={() => setIsEditing(!isEditing)}>
                    <Image
                      src={"/images/icons/icon-pencil.svg"}
                      width={20}
                      height={20}
                      alt="Edit Book Sale Icon"
                      className="ml-20"
                    />
                  </button>
                </div>
                <h6>Starts: {formatDate(user?.booksale?.date_starts)}</h6>
                <h6>Ends: {formatDate(user?.booksale?.date_ends)}</h6>
                <h6>Hours: {user?.booksale?.hours}</h6>
                <h6>
                  Street:{" "}
                  {user?.booksale?.business_street
                    ? user.booksale.business_street
                    : user?.business?.business_street}
                </h6>
                <h6>
                  City:{" "}
                  {user?.booksale?.business_city
                    ? user.booksale.business_city
                    : user?.business?.business_city}
                </h6>
                <h6>
                  Zip:{" "}
                  {user?.booksale?.business_zip
                    ? user.booksale.business_zip
                    : user?.business?.business_zip}
                </h6>
              </div>
            )}
          </div>
        </div>

        <ContentTable deleteBookRow={deleteBookRow} />
      </div>
    </div>
  );
};

export default FutureListingComponent;
