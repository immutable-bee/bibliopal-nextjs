import { useState, useEffect } from "react";
import Image from "next/image";
import TooltipComponent from "../../utility/Tooltip";

const Alerts = ({ props, fetchUserData }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newZip, setNewZip] = useState("");

  const [titles, setTitles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);

  useEffect(() => {
    if (props) {
      setTitles(props.titles);
      setAuthors(props.authors);
      setZipCodes(props.zipCodes);
    }
  }, [props]);

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    if (newTitle !== "") {
      const res = await fetch("/api/consumer/update/titleAlerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          title: newTitle,
          type: "add",
        }),
      });
      if (!res.ok) {
        return;
      }

      fetchUserData();
      setNewTitle("");
    }
  };

  const handleAuthorSubmit = async (e) => {
    e.preventDefault();
    if (newAuthor !== "") {
      const res = await fetch("/api/consumer/update/authorAlerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          author: newAuthor,
          type: "add",
        }),
      });
      if (!res.ok) {
        return;
      }

      fetchUserData();
      setNewAuthor("");
    }
  };

  const handleZipSubmit = async (e) => {
    e.preventDefault();
    if (newZip !== "") {
      const res = await fetch("/api/consumer/update/zipCodeAlerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: props.email, zip: newZip, type: "add" }),
      });
      if (!res.ok) {
        return;
      }

      fetchUserData();
      setNewZip("");
    }
  };

  const deleteTitle = async (index) => {
    const res = await fetch("/api/consumer/update/titleAlerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        title: titles[index],
        type: "delete",
      }),
    });
    fetchUserData();
  };

  const deleteAuthor = async (index) => {
    const res = await fetch("/api/consumer/update/authorAlerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        author: authors[index],
        type: "delete",
      }),
    });
    fetchUserData();
  };

  const deleteZipCode = async (index) => {
    const res = await fetch("/api/consumer/update/zipCodeAlerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        zip: zipCodes[index],
        type: "delete",
      }),
    });
    fetchUserData();
  };

  return (
    <>
      <div className="mt-1 sm:mt-4">
        <label className="text-sm text-black font-medium">Titles</label>
        <div>
          <form className="flex my-1" onSubmit={handleTitleSubmit}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
              type="text"
            />
            <button
              type="submit"
              className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2"
            >
              <Image
                src={"/images/copy.svg"}
                width={20}
                height={20}
                alt="profile-icon"
                className="img-fluid"
              />
            </button>
          </form>
        </div>
        <div className="flex items-center mt-3 overflow-x-auto">
          {titles?.map((title, index) => (
            <div key={index} className="flex mx-1 flex-shrink-0">
              <p className="rounded-full flex items-center border text-xs sm:text-sm font-medium border-[#2eaaed] px-2 py-1">
                {title}
                <span
                  className="ms-2 cursor-pointer flex-shrink-0"
                  onClick={() => deleteTitle(index)}
                >
                  <Image
                    src={"/images/close-circle.svg"}
                    alt=""
                    className="w-3 sm:w-4"
                    width={4}
                    height={4}
                  />
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm text-black font-medium">Authors</label>
        <div>
          <form className="flex my-1" onSubmit={handleAuthorSubmit}>
            <input
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
              type="text"
            />
            <button
              type="submit"
              className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2"
            >
              <Image
                src={"/images/copy.svg"}
                width={20}
                height={20}
                alt="profile-icon"
                className="img-fluid"
              />
            </button>
          </form>
        </div>
        <div className="flex items-center mt-3 overflow-x-auto">
          {authors?.map((author, index) => (
            <div key={index} className="flex mx-1 flex-shrink-0">
              <p className="rounded-full flex items-center border text-sm font-medium border-[#2eaaed] px-2 py-1">
                {author}
                <span
                  className="ms-2 cursor-pointer flex-shrink-0"
                  onClick={() => deleteAuthor(index)}
                >
                  <Image
                    src={"/images/close-circle.svg"}
                    alt=""
                    className="w-4"
                    width={4}
                    height={4}
                  />
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <h3 className="text-xl mt-5 sm:mt-16 font-medium">
            Book alert zip codes
          </h3>
          <div className="mt-16">
            <TooltipComponent
              rounded
              width="!w-64"
              id="shipping-status-tooltip"
              css={{ zIndex: 10000 }}
              content={
                "Adding zip code(s) will limit matches to stores in the provided zip code(s). This is strongly recommended."
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 ml-3 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </TooltipComponent>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-black font-medium">Zip Code</label>
          <div>
            <form className="flex my-1" onSubmit={handleZipSubmit}>
              <input
                value={newZip}
                onChange={(e) => setNewZip(e.target.value)}
                className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
                type="text"
                placeholder="1593300"
              />
              <button
                type="submit"
                className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2"
              >
                <Image
                  src={"/images/copy.svg"}
                  width={20}
                  height={20}
                  alt="profile-icon"
                  className="img-fluid"
                />
              </button>
            </form>
          </div>
          <div className="flex items-center mt-3 overflow-x-auto">
            {zipCodes?.map((row, index) => (
              <div key={index} className="flex mx-1 flex-shrink-0">
                <p className="rounded-full flex items-center border text-sm font-medium border-[#2eaaed] px-2 py-1">
                  {row}
                  <span
                    className="ms-2 cursor-pointer flex-shrink-0"
                    onClick={() => deleteZipCode(index)}
                  >
                    <Image
                      src={"/images/close-circle.svg"}
                      alt=""
                      className="w-4"
                      width={4}
                      height={4}
                    />
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Alerts;
