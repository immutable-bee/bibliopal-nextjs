import Image from "next/image";
import Link from "next/link";

//TODO:
//Ensure repsonsiveness on mobile
//Add styling

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full mb-10 p-5">
      <Image
        src={"/logo.png"}
        width={300}
        height={150}
        alt="logo"
        className="py-5"
      />
      <div className="flex flex-col w-full items-center gap-5 border-t-2 border-gray py-10">
        <h6 className="text-center text-2xl font-bold">
          A frugal readers best friend
        </h6>
        <h6 className="text-center text-lg">
          A must for readers who love reading and hunting for a good bargain
        </h6>
        <h6 className="sm:pt-20 pt-8 text-center text-xl sm:text-4xl">Start Your Free Account Today!</h6>
        <h6 className="">No credit card required</h6>
        <Link href={"/auth?type=consumer"}>
          <button className="py-5 px-10 rounded-lg bg-biblioGreen text-gray-500">
            Start a reader account
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 items-center w-full">
        <div className="sm:mb-8 sm:mt-8 mt-14 sm:flex justify-center gap-5 items-center w-full">
          <div className="border-2 border-gray-100">
            <Image
              src={"/images/landingpage/row-one.png"}
              width={500}
              height={400}
              alt="Search Example Image"
            />
          </div>
          <div className="sm:mt-0 mt-6">
            <h6 className="sm:pb-5 text-2xl sm:text-4xl">Search Books</h6>
            <h6 className="sm:pt-5 max-w-lg ">
              Find your must have authors and titles at bargain prices near you
              instantly.
            </h6>
          </div>
        </div>

        <div className="sm:mb-8 sm:mt-8 mt-14 sm:flex justify-center flex-row-reverse gap-5 items-center w-full">
          <div >
            <Image
              src={"/images/landingpage/row-two.png"}
              width={500}
              height={400}
              alt="Automated Notifications Image"
            />
          </div>
          <div className="sm:mt-0 mt-6">
            <h6 className="sm:pb-5 text-2xl sm:text-4xl">Automated Notifications</h6>
            <h6 className="pt-5 max-w-lg ">
              Receive email notifications of newly listed titles and authors on
              your watch list.
            </h6>
          </div>

        </div>

        <div className="sm:mb-8 sm:mt-8 mt-14 sm:flex justify-center gap-5 items-center w-full">
          <div>
            <Image
              src={"/images/landingpage/row-three.png"}
              width={500}
              height={400}
              alt="Save Money Image"
            />
          </div>
          <div className="sm:mt-0 mt-6">
            <h6 className="sm:pb-5 text-2xl sm:text-4xl">Save Money</h6>
            <h6 className="pt-5 max-w-lg ">
              The more money you save on books, the more books you can buy!
            </h6>
          </div>
        </div>

        <div className="sm:mb-8 sm:mt-8 mt-14 sm:flex justify-center flex-row-reverse gap-5 items-center w-full">
          <div className="border-2 border-gray-100">
            <Image
              src={"/images/landingpage/row-four.png"}
              width={500}
              height={400}
              alt="Help the planet"
            />
          </div>
          <div className="sm:mt-0 mt-6">
            <h6 className="sm:pb-5 text-xl sm:text-3xl">
              Be a friend of books and to the planet
            </h6>
            <h6 className="pt-5 max-w-lg ">
              Find books that you love in your neighborhood and save books from
              being sent to the landfill. Be a more responsible book buyer
              today.
            </h6>
          </div>

        </div>
      </div>

      <div className="flex flex-col w-full items-center gap-5  ">
        <h6 className="pt-20 text-2xl text-center sm:text-4xl">Start Your Free Account Today!</h6>
        <h6 className="">No credit card required</h6>
        <Link href={"/auth?type=consumer"}>
          <button className="py-5 px-10 rounded-lg bg-biblioSeafoam text-gray-500">
            Start a reader account
          </button>
        </Link>
      </div>

      <div className="sm:flex justify-center gap-10 items-center w-full mt-20">
        <div className="border-2 border-gray-100">
          <Image
            src={"/images/landingpage/bottom-row.png"}
            width={550}
            height={500}
            alt="Bookstore Image"
          />
        </div>
        <div className="sm:mt-0 mt-6">
          <h6 className="sm:pb-5 text-2xl sm:text-5xl">Got Books?</h6>
          <h6 className="pt-3 max-w-md ">
            Thrift, Library or Used Bookstores can list their books for free (no
            credit card required)
          </h6>
          <Link href={"/auth?type=business"}>
            <button className="mt-10 py-4 px-8 rounded-lg bg-biblioSeafoam text-gray-500">
              Start a store account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
