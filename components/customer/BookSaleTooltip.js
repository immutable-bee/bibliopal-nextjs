import TooltipComponent from "../utility/Tooltip";

const BookSaleTooltip = ({ listing, placement = "above" }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const booksaleTooltipDataHandler = () => {
    return (
      <p>
        <h2 className="text-lg mb-1">Library Sale</h2>
        Starts: {formatDate(listing.booksale.date_starts)}
        <br></br>
        Ends: {formatDate(listing.booksale.date_ends)}
        <br></br>
        Hours: {listing.booksale.hours}
        <br></br>
        {listing.booksale.business_street && (
          <p className="mt-5">
            Address:
            <br></br>
            {listing.booksale.business_street}
            <br></br>
            {listing.booksale.business_city}
            <br></br>
            {listing.owner.business_state}
            <br></br>
            {listing.booksale.business_zip}
          </p>
        )}
      </p>
    );
  };
  return (
    <TooltipComponent
      rounded
      width="!w-48"
      id="booksale-data-tooltip"
      css={{ zIndex: 10000 }}
      className="z-50"
      content={booksaleTooltipDataHandler()}
      placement={placement}
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
  );
};

export default BookSaleTooltip;
