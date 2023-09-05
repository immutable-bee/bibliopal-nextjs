import { useState, useEffect } from "react";
import Image from "next/image";
import TooltipComponent from "../../utility/Tooltip";

const Alerts = ({ props, fetchUserData }) => {
  const [newAlert, setNewAlert] = useState({
    title: "",
    author: "",
  });

  const [newISBN, setNewISBN] = useState("");
  const [newZip, setNewZip] = useState("");

  const [alerts, setAlerts] = useState([]);
  const [ISBNAlerts, setISBNAlerts] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);

  useEffect(() => {
    if (props) {
      setZipCodes(props.zipCodes);
      setISBNAlerts(props.alerts.filter((alert) => Boolean(alert.isbn)));
      setAlerts(props.alerts.filter((alert) => !Boolean(alert.isbn)));
    }
  }, [props]);

  const handleChange = (e) => {
    setNewAlert((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    if (newAlert.author !== "") {
      const res = await fetch("/api/consumer/update/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          title: newAlert.title,
          author: newAlert.author,
          type: "add",
        }),
      });
      if (!res.ok) {
        return;
      }

      fetchUserData();
      setNewAlert({
        title: "",
        author: "",
      });
    }
  };

  const handleISBNSubmit = async (e) => {
    e.preventDefault();
    if (newISBN !== "") {
      const res = await fetch("/api/consumer/update/isbnAlerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          isbn: newISBN,
          type: "add",
        }),
      });
      if (!res.ok) {
        return;
      }

      fetchUserData();
      setNewISBN("");
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

  const deleteAlert = async (index) => {
    const res = await fetch("/api/consumer/update/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        title: alerts[index].title,
        author: alerts[index].author,
        type: "delete",
      }),
    });
    fetchUserData();
  };

  const deleteISBN = async (index) => {
    const res = await fetch("/api/consumer/update/isbnAlerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        isbn: ISBNAlerts[index].isbn,
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
        <div className="flex items-center mt-3 overflow-x-auto">
          {alerts?.map((alert, index) => (
            <div key={index} className="flex mx-1 flex-shrink-0">
              <p className="rounded-full flex items-center border text-xs sm:text-sm font-medium border-[#2eaaed] px-2 py-1">
                {alert.title ? `${alert.title}, ${alert.author}` : alert.author}
                <span
                  className="ms-2 cursor-pointer flex-shrink-0"
                  onClick={() => deleteAlert(index)}
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
        <label className="text-sm text-black font-medium">Title</label>
        <div>
          <input
            name="title"
            value={newAlert.title}
            onChange={handleChange}
            className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
            type="text"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm text-black font-medium">Author *</label>
        <div>
          <form
            className="flex flex-col items-center my-1"
            onSubmit={handleAlertSubmit}
          >
            <input
              name="author"
              value={newAlert.author}
              onChange={handleChange}
              className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
              type="text"
              required
            />
            <button
              type="submit"
              className="mt-3 bg-[#2eaaed] py-3 px-8 flex items-center  rounded-lg  text-decoration-none ms-2"
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
      </div>
      <div className="border-t border-black border-dashed mt-5">
        <h6 className="text-center text-2xl pt-3">OR</h6>
        <label className="text-sm text-black font-medium">ISBN</label>
        <div>
          <form className="flex my-1" onSubmit={handleISBNSubmit}>
            <input
              value={newISBN}
              onChange={(e) => setNewISBN(e.target.value)}
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
          <div className="flex items-center mt-3 overflow-x-auto">
            {ISBNAlerts?.map((alert, index) => (
              <div key={index} className="flex mx-1 flex-shrink-0">
                <p className="rounded-full flex items-center border text-xs sm:text-sm font-medium border-[#2eaaed] px-2 py-1">
                  {alert.isbn}
                  <span
                    className="ms-2 cursor-pointer flex-shrink-0"
                    onClick={() => deleteISBN(index)}
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
