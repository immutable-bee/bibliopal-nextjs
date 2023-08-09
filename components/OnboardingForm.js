import { useState } from "react";
import AuthContainer from "./containers/AuthContainer";
import Image from "next/image";
import { Checkbox, Input, Button } from "@nextui-org/react";

const stateOptions = [
  { key: "al", value: "AL", text: "Alabama" },
  { key: "ak", value: "AK", text: "Alaska" },
  { key: "az", value: "AZ", text: "Arizona" },
  { key: "ar", value: "AR", text: "Arkansas" },
  { key: "ca", value: "CA", text: "California" },
  { key: "co", value: "CO", text: "Colorado" },
  { key: "ct", value: "CT", text: "Connecticut" },
  { key: "de", value: "DE", text: "Delaware" },
  { key: "fl", value: "FL", text: "Florida" },
  { key: "ga", value: "GA", text: "Georgia" },
  { key: "hi", value: "HI", text: "Hawaii" },
  { key: "id", value: "ID", text: "Idaho" },
  { key: "il", value: "IL", text: "Illinois" },
  { key: "in", value: "IN", text: "Indiana" },
  { key: "ia", value: "IA", text: "Iowa" },
  { key: "ks", value: "KS", text: "Kansas" },
  { key: "ky", value: "KY", text: "Kentucky" },
  { key: "la", value: "LA", text: "Louisiana" },
  { key: "me", value: "ME", text: "Maine" },
  { key: "md", value: "MD", text: "Maryland" },
  { key: "ma", value: "MA", text: "Massachusetts" },
  { key: "mi", value: "MI", text: "Michigan" },
  { key: "mn", value: "MN", text: "Minnesota" },
  { key: "ms", value: "MS", text: "Mississippi" },
  { key: "mo", value: "MO", text: "Missouri" },
  { key: "mt", value: "MT", text: "Montana" },
  { key: "ne", value: "NE", text: "Nebraska" },
  { key: "nv", value: "NV", text: "Nevada" },
  { key: "nh", value: "NH", text: "New Hampshire" },
  { key: "nj", value: "NJ", text: "New Jersey" },
  { key: "nm", value: "NM", text: "New Mexico" },
  { key: "ny", value: "NY", text: "New York" },
  { key: "nc", value: "NC", text: "North Carolina" },
  { key: "nd", value: "ND", text: "North Dakota" },
  { key: "oh", value: "OH", text: "Ohio" },
  { key: "ok", value: "OK", text: "Oklahoma" },
  { key: "or", value: "OR", text: "Oregon" },
  { key: "pa", value: "PA", text: "Pennsylvania" },
  { key: "ri", value: "RI", text: "Rhode Island" },
  { key: "sc", value: "SC", text: "South Carolina" },
  { key: "sd", value: "SD", text: "South Dakota" },
  { key: "tn", value: "TN", text: "Tennessee" },
  { key: "tx", value: "TX", text: "Texas" },
  { key: "ut", value: "UT", text: "Utah" },
  { key: "vt", value: "VT", text: "Vermont" },
  { key: "va", value: "VA", text: "Virginia" },
  { key: "wa", value: "WA", text: "Washington" },
  { key: "wv", value: "WV", text: "West Virginia" },
  { key: "wi", value: "WI", text: "Wisconsin" },
  { key: "wy", value: "WY", text: "Wyoming" },
];

const OnboardingForm = ({ isCompleteHandler, loadingHandler }) => {
  const [isStepOne, setIsStepOne] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);

  const [formData, setFormData] = useState();

  const formStepHandler = () => {
    if (isStepOne) {
      // Check if required fields in step one are filled
      if (formData?.business_name && formData?.type) {
        setIsStepOne(false);
      } else {
        alert("Please fill out all required fields before proceeding.");
      }
    } else {
      setIsStepOne(true);
    }
  };

  const tcModalHandler = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingHandler(true);

    try {
      const res = await fetch("/api/auth/onboarding/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to onboard user");
      }

      const data = await res.json();
      loadingHandler(false);
      isCompleteHandler();
    } catch (err) {
      console.error(err);
      loadingHandler(false);
    }
  };

  return (
    <>
      <div className="auth-content-container pb-8">
        {!isStepOne && (
          <div
            id="onboarding-back-btn"
            onClick={formStepHandler}
            className="flex justify-center mt-3 py-1 bg-atlantis w-7 rounded-full border border-black cursor-pointer hover:opacity-80"
            size={""}
          >
            <Image
              src="https://www.buylocalbooksnetwork.com/icons/icon-chevron.svg"
              alt="chevron icon"
              height="17"
              width="17"
              id="chevron-icon"
            />
          </div>
        )}

        <form id="onboarding-form" className="mt-6" onSubmit={handleSubmit}>
          {isStepOne ? (
            <>
              <>
                <select
                  name="BUSINESSTYPE"
                  onChange={handleChange}
                  className="
                          border-[#f1f3f5] w-full
                          rounded-xl
                          bg-[#f1f3f5]
                          !placeholder-gray-400 text-gray-900 text-sm
                          h-10
                          my-2 px-2
                        "
                >
                  <option value="" disabled selected>
                    Business type
                  </option>
                  <option value="THRIFT">Thrift</option>
                  <option value="BOOKSTORE">Bookstore</option>
                  <option value="LIBRARY">Library</option>
                </select>
                <Input
                  required={true}
                  onChange={handleChange}
                  className="onboard-fields my-2"
                  placeholder="Bookstore Business Name"
                  name="business_name"
                />
                <Input
                  onChange={handleChange}
                  className="onboard-fields my-2"
                  placeholder="Website Url"
                  name="url"
                />
                <Button rounded id="form-step-btn" onClick={formStepHandler}>
                  Next
                </Button>
              </>
            </>
          ) : (
            <div id="onboarding-step-two-container">
              <Input
                required={true}
                onChange={handleChange}
                className="onboard-fields  my-2"
                name="business_street"
                placeholder="Business Address"
              />
              <Input
                required={true}
                onChange={handleChange}
                className="onboard-fields  my-2"
                name="business_city"
                placeholder="Business City"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  name="business_state"
                  onChange={handleChange}
                  className="
                      border-[#f1f3f5]
                      rounded-xl
                      bg-[#f1f3f5]
                      text-[#787878]
                      h-10
                      my-2 px-2
                      "
                >
                  {stateOptions.map((state) => (
                    <option key={state.key} value={state.value}>
                      {state.text}
                    </option>
                  ))}
                </select>
                <Input
                  required={true}
                  onChange={handleChange}
                  className="small-onboard-fields  my-2"
                  name="business_zip"
                  placeholder="Zip Code"
                />
              </div>

              <div
                id="onboarding-form-tc-row"
                className="flex items-center mt-3"
              >
                <Checkbox
                  onChange={setAgreedToTerms}
                  id="onboarding-form-tc-checkbox"
                  className="mr-2"
                  size={"sm"}
                ></Checkbox>
                <h6 id="onboarding-form-tc-agree-text">I agree to the</h6>
                <h6
                  id="onboarding-form-tc-link"
                  className="text-atlantis ml-1 cursor-pointer"
                  onClick={tcModalHandler}
                >
                  Terms and Conditions
                </h6>
              </div>
              <Button type="submit">Submit</Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default OnboardingForm;
