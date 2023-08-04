import Image from "next/image";
import PeopleSVG from "../../assets/svg/people.svg";
import Logo from "../../public/logo.png";
import { Button, Input, Loading } from "@nextui-org/react";
import { useMemo, useState } from "react";
import IconGoogle from "../../assets/svg/icon-google.svg";
import { useSession, signIn } from "next-auth/react";
import IconEnvelope from "../../assets/svg/icons_envelope.svg";
import Link from "next/link";

const providers = [
  {
    name: "google",
    icon: IconGoogle,
  },
  {
    name: "facebook",
    icon: "/icons/icon-fb.svg",
  },
  {
    name: "apple",
    icon: "/icons/icon-apple.svg",
  },
];

const BusinessAuthContainer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) return false;

    signIn("email", { email, redirect: false }).then(
      setTimeout(() => {
        setLoginSuccess(true), setLoading(false);
      }, 3000)
    );
  };

  const handle0AuthSignIn = (provider) => () => signIn(provider);

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = useMemo(() => {
    if (!email)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(email);
    return {
      text: isValid ? "Valid email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [email]);

  return (
    <div className="sm:flex min-h-screen bg-[#FEFBE8] onboarding-page-container">
      <div
        className="sm:w-1/2 hidden sm:flex items-center justify-center"
        id="people-svg-container"
      >
        <Image
          id="people-svg"
          src={PeopleSVG}
          alt="People Networking"
          width={500}
          height={450}
        />
      </div>
      <div
        className="sm:w-1/2 flex items-center justify-center"
        id="auth-rect-container"
      >
        <div className="bg-white sm:pt-12 sm:pb-3 sm:border rounded-3xl sm:border-gray-700 min-h-screen sm:min-h-[auto] sm:block flex items-center sm:max-w-lg w-full mx-auto px-4 sm:px-12">
          <div className="w-full">
            <div id="logo-container" className="flex justify-center mb-4">
              <Image src={Logo} alt="Logo" className="!w-32" />
            </div>

            <div className="auth-content-container">
              <h2 className="text-xl font-medium text-center">
                Welcome to the BiblioPal!
              </h2>
              <h2 className="pt-5 text-sm text-center">
                Get Started with a seller account by signing up below. You will
                be able to start listing your inventory after signing up.
              </h2>
              <form id="login-form" className="mt-6" onSubmit={handleSubmit}>
                <Input
                  className="w-full"
                  placeholder="Your Email"
                  id="email"
                  name="email"
                  type="email"
                  status={helper.color}
                  color={helper.color}
                  helperColor={helper.color}
                  helperText={helper.text}
                  contentLeft={
                    <Image
                      src={IconEnvelope}
                      alt="mail icon"
                      height="17"
                      width="17"
                      id="bmail-icon"
                    />
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button id="login-btn" className="w-full" type="submit">
                  Continue with email
                </Button>
              </form>
              <div class="relative py-4">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t border-[#ffc71f]"></div>
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                  <span class="bg-white font-medium px-6 text-gray-600">
                    Or
                  </span>
                </div>
              </div>
              <div id="social-auth-container">
                <Button
                  size={""}
                  className="social-provider-btn"
                  onClick={handle0AuthSignIn(providers[0].name)}
                  icon={
                    <Image
                      className="w-6"
                      src={providers[0].icon}
                      alt={`${providers[0].name} icon`}
                      width="35"
                      height="35"
                    />
                  }
                ></Button>
              </div>
              <p className="text-center pt-2 text-sm">
                Did you mean to sign up for a reader account?<br></br>Click{" "}
                <Link
                  className="text-blbBlue text-md"
                  href={"/auth?type=consumer"}
                >
                  {" "}
                  Here{" "}
                </Link>
              </p>
              <h6 className="text-xs text-center text-gray-500 mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAuthContainer;
