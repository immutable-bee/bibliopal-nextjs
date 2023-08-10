const BookSale = () => {
  return (
    <>
      <div className="py-2">
        <label className="text-sm text-gray-700">
          Physical address of the sale
        </label>
        <input
          type="text"
          className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
          onChange={(e) => setPhysicalAddressSale(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="text-sm text-gray-700">Start date</label>
        <input
          type="date"
          className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="text-sm text-gray-700">End date</label>
        <input
          type="date"
          className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="text-sm text-gray-700">Hours of the sale</label>
        <input
          type="text"
          className="bg-white focus:ring-1 focus:ring-[#ffc71f] focus:outline-none form-input border border-gray-500 w-full rounded-lg  px-4 my-1 py-2"
          onChange={(e) => setHoursSale(e.target.value)}
        />
      </div>
    </>
  );
};

export default BookSale;
