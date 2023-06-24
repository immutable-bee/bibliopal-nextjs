import {
  Button,
  Checkbox,
  Input,
  Image,
  Loading,
  Modal,
} from "@nextui-org/react";
// import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AuthContainer from "../components/containers/AuthContainer";
import { useRouter } from "next/router";
import IconChevron from '../assets/svg/icon-chevron.svg'
const TCModal = (props) => {
  return (
    <Modal
      open={props.visible}
      onClose={props.closeHandler}
      scroll
      width="600px"
      closeButton
    >
      <Modal.Header>Terms & Conditions</Modal.Header>
      <Modal.Body>
        {" "}
        <p>
          Terms and Conditions for Membership with Buy Local Books Network
          <br></br>
          Please read these Terms and Conditions carefully before submitting
          your application for membership with the Buy Local Books Network. By
          submitting your application, you agree to be bound by these Terms and
          Conditions.
          <br></br>Application and Membership:<br></br>The Buy Local Books
          Network is an exclusive network for bookstores in the United States.
          Upon submission of your application, you will be able to login to the
          Buy Local Books Network. However, you will not have access to sell or
          buy books until the approval process is complete. We reserve the right
          to refuse membership to any bookstore at our sole discretion.<br></br>
          Access to the Buy Local Books Network:<br></br>Upon approval of your
          membership, you will have access to the Buy Local Books Network&apos;s
          features. This access is non-transferable and intended solely for your
          use.<br></br>Listing and Selling Books:<br></br>
          As a member of the Buy Local Books Network, you will have the ability
          to list and sell books through the Network. You will be responsible
          for complying with all applicable laws and regulations related to the
          sale of books. We will not be liable for any violations committed by
          you.
          <br></br>
          Service Fees:<br></br>There is no fee associated with submitting an
          application for membership with the Buy Local Books Network. However,
          we reserve the right to charge service fees for the use of the
          Network. Any service fees will be clearly disclosed to you.<br></br>
          Listing Fees:
          <br></br>There are no listing fees associated with listing books for
          sale through the Network.
          <br></br>Payment Processing:<br></br>We use a third-party payment
          processor to handle all transactions made through the Buy Local Books
          Network. We are not responsible for any issues related to payment
          processing, including but not limited to fraudulent charges,
          chargebacks, or disputes.
          <br></br>Intellectual Property:<br></br>All content included on the
          Buy Local Books Network, including text, graphics, logos, images, and
          software, is the property of our company or its suppliers and
          protected by copyright laws. The content may not be used or reproduced
          without express written permission from us.<br></br>Limitation of
          Liability:
          <br></br>We will not be liable for any damages arising out of your
          membership with the Buy Local Books Network, including but not limited
          to lost profits, direct or indirect damages, or consequential damages.
          <br></br>Governing Law and Jurisdiction:<br></br>These terms and
          conditions shall be governed by and interpreted in accordance with the
          laws of the United States of America. Any dispute arising from these
          terms and conditions shall be subject to the exclusive jurisdiction of
          the competent courts in the United States of America.<br></br>Changes
          to Terms and Conditions:<br></br>
          We reserve the right to modify these Terms and Conditions at any time
          without prior notice. Any changes will be posted on the Buy Local
          Books Network and will apply to all members.
          <br></br>
          <br></br>Buy Local Books Network Privacy Policy<br></br>At Buy Local
          Books Network, we are committed to protecting your privacy. This
          Privacy Policy outlines the types of information we collect, how we
          use that information, and your rights with respect to your personal
          information.
          <br></br>
          Information Collection:<br></br>
          We collect certain personally identifiable information, such as your
          name, email address, and phone number, when you submit an application
          for membership. We do not sell or rent your personal information to
          third parties. In addition, we automatically collect certain
          non-personally identifiable information, such as your IP address,
          browser type, and operating system, when you visit our website. We may
          use this information to analyze trends, track usage, and improve our
          website and services. Use of Information:<br></br>We use personal
          information collected through the Buy Local Books Network for the
          following purposes:<br></br>- To process your application for
          membership
          <br></br>- To communicate with you regarding your membership and
          related services<br></br>- To provide and improve our services
          <br></br>- To comply with applicable laws and regulations<br></br>
          Data Sharing:<br></br> We may share your personal information with
          third-party service providers who perform services on our behalf, such
          as payment processing, website hosting, and email delivery. We require
          these service providers to maintain the confidentiality of your
          personal information and not use it for any other purpose. We may also
          share your personal information with law enforcement, government
          officials, or other third parties in response to a subpoena, court
          order, or other legal process, or if we believe disclosure is
          necessary or appropriate to protect our rights, property, or safety,
          or the rights, property, or safety of our customers or others.
          <br></br>Data Retention:<br></br>We retain personal information for as
          long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required or permitted by
          law.<br></br>Your Rights:<br></br>
          Under certain circumstances, you have the right to request access to
          and deletion of your personal information, as well as the right to
          object to processing and to data portability. You also have the right
          to opt-out of certain types of communications from us.<br></br>
          Security: We take reasonable measures to protect your personal
          information from unauthorized access, use, disclosure, and
          destruction.<br></br>Changes to this Privacy Policy:<br></br>We
          reserve the right to modify this Privacy Policy at any time by posting
          an updated version on our website. If we make material changes to this
          Privacy Policy, we will notify you by email or by posting a notice on
          our website.
        </p>
      </Modal.Body>
    </Modal>
  );
};

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

const OnboardingFormPage = () => {
  // const { data: session } = useSession({ required: true });

  const [senderEmail, setSenderEmail] = useState();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStepOne, setFormStepOne] = useState(true);
  const { push } = useRouter();
  const [selected, setSelected] = useState(true);
  const [tcVisible, setTCvisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const tcModalHandler = () => {
    setTCvisible(!tcVisible);
  };

    // useEffect(() => {
    //   if (session) {
    //     const userEmail = session.user.email;
    //     setSenderEmail(userEmail);
    //   }
    // }, [session]);

    useEffect(() => {
      if (successMessage != "") {
        setTimeout(() => {
          push("/listed-inventory");
        }, 3000);
      }
    }, [successMessage, push]);
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const checkbox = document.getElementById("onboarding-form-tc-checkbox");
    if (!agreedToTerms) {
      alert(
        "Please agree to the Terms and Conditions before submitting the application."
      );
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/onboarding", {
        method: "POST",
        body: JSON.stringify([senderEmail, formData]),
      });
      setLoading(false);
      setSuccessMessage("Onboarding form submitted");
      setErrorMessage("");
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred while sending your data");
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "business_state") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      // Handle other inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const formStepHandler = () => {
    if (formStepOne) {
      // Check if required fields in step one are filled
      if (formData?.business_name && formData?.phone_number) {
        setFormStepOne(false);
      } else {
        alert("Please fill out all required fields before proceeding.");
      }
    } else {
      setFormStepOne(true);
    }
  };

  return (
    <AuthContainer
      content={
        <div className="auth-content-container pb-8">
          {!formStepOne && (
            <div
              id="onboarding-back-btn"
              onClick={formStepHandler}
              className="bg-atlantis w-7 rounded-full border border-black cursor-pointer hover:opacity-80"
              size={""}
             
            >

<Image
                  src='https://www.buylocalbooksnetwork.com/icons/icon-chevron.svg'
                  alt="chevron icon"
                  height="17"
                  width="17"
                  id="chevron-icon"
                />
            </div>
          )}
          <h2 className="text-2xl font-medium text-center">Onboarding Form</h2>
          <form id="onboarding-form" className="mt-6" onSubmit={handleSubmit}>
            {formStepOne ? (
              <>
                <Input
                  required={true}
                  onChange={handleChange}
                  className="onboard-fields my-2"
                  placeholder="Bookstore Business Name"
                  name="business_name"
                />
                <Input
                  required={true}
                  onChange={handleChange}
                  className="onboard-fields my-2"
                  placeholder="Business phone number"
                  name="phone_number"
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
                <div className="checkbox">
                <Checkbox
                  size={"sm"}
                  isSelected={selected}
                  onChange={setSelected}
                >
                  Use business address as shipping address?
                </Checkbox>
                </div>
                {!selected && (
                  <>
                    <Input
                      onChange={handleChange}
                      className="onboard-fields  my-2"
                      name="shipping_street"
                      placeholder="Shipping Address"
                    />
                    <Input
                      onChange={handleChange}
                      className="onboard-fields  my-2"
                      name="shipping_city"
                      placeholder="Shipping City"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="shipping_state"
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
                        onChange={handleChange}
                        className="small-onboard-fields  my-2"
                        name="shipping_zip"
                        placeholder="Shipping Zip"
                      />
                    </div>
                  </>
                )}
                <div id="onboarding-form-tc-row" className="flex items-center">
                  <Checkbox
                    onChange={setAgreedToTerms}
                    id="onboarding-form-tc-checkbox"
                    className="mr-2"
                    size={"sm"}
                  ></Checkbox>
                  <h6 id="onboarding-form-tc-agree-text">I agree to the</h6>
                  <h6 id="onboarding-form-tc-link" className="text-atlantis ml-1 cursor-pointer" onClick={tcModalHandler}>
                    Terms and Conditions
                  </h6>
                </div>
                {successMessage == "" && errorMessage == "" ? (
                  <Button
                    disabled={loading}
                    rounded
                    type={"submit"}
                    id="submit-onboarding-form-btn"
                  >
                    {!loading ? "Submit Application" : <Loading size={"sm"} />}
                  </Button>
                ) : (
                  <h6>{`${successMessage} Redirecting...`}</h6>
                )}
              </div>
            )}
          </form>
          <TCModal visible={tcVisible} onClose={tcModalHandler} />
        </div>
      }
    />
  );
};

export default OnboardingFormPage;
