import { useState } from "react";
import Header from "@/components/Header";

import Actions from "@/components/Actions";
import ISBNSearchBox from "@/components/ISBNSearchBox";
import ContentTable from "@/components/ContentTable";
const FutureListingComponent = ({
  error,
  setError,
  createNewRow,
  deleteBookRow,
}) => {
  return (
    <div className="min-h-screen bg-[#FEFBE8]">
      <Header />
      <div className=" px-3 sm:px-8 py-3 sm:py-4 mx-auto">
        <div className="px-3 sm:px-0 border border-black rounded-2xl">
          <div className="w-full sm:w-96 py-8 mx-auto">
            <ISBNSearchBox
              error={error}
              setError={setError}
              createNewRow={createNewRow}
            />

            <Actions isSale={true} />
          </div>
        </div>

        <ContentTable deleteBookRow={deleteBookRow} />
      </div>
    </div>
  );
};

export default FutureListingComponent;
