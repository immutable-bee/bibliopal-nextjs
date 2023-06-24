import React, { useState, useMemo } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Input, Loading, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import AuthContainer from "../../components/containers/AuthContainer";
import TCModal from "../../components/modals/TCModal";
import IconEnvelope from '../../assets/svg/icons_envelope.svg'
import IconGoogle from '../../assets/svg/icon-google.svg'

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

const firstTimeMessage = () => {
  return (
    <p id="first-time-text">
      Welcome!<br></br> To get started please either enter your email or choose
      from one of our account providers. <br></br>
      <br></br> If you choose to use your email you will receive a sign in link.
      The first email will also create an account for you.<br></br>
      <br></br>After creating your account you will have access to view our
      platform but will be unable to use our service (I.E. making or accepting
      offers) until you are approved. Approval usually happens within 24 hours.
      <br></br>
      <br></br>
      By proceeding you are "opting in" to receive emails relevant to your
      account from Buy Local Books Network
    </p>
  );
};

const SignInPage = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [visible, setVisible] = useState(false);
  const termsModalHandler = () => setVisible(true);
  const termsModalCloseHandler = () => setVisible(false);

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

  if (status == "loading")
    return (
      <AuthContainer id="login-loader" content={<Loading size={"lg"} />} />
    );

  if (session) {
    setTimeout(() => {
      push("/listings");
    }, 5000);

    return (
      <AuthContainer
        content={
          <div id="signin-page-signed-in-row">
            <h5 id="signin-page-signed-in-message">
              You are signed in. Redirecting
            </h5>
            <Loading id="signin-page-already-signed-in-loader" type="points" />
          </div>
        }
      />
    );
  }

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

  if (!loading && !loginSuccess) {
    return (
      <AuthContainer
        content={
          <div className="auth-content-container">
            <h2 className="text-xl font-medium text-center">
              Welcome to the BiblioPal!
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
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-[#ffc71f]"></div>
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white font-medium px-6 text-gray-600">Or</span>
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
            <h6 className="text-xs text-center text-gray-500 mt-3">
              Buy Local Books Network is an exclusive network for bookstores in
              the US. When the application is submitted, you will be able to
              login into the network, but will not have access to sell or buy
              books until the approval process is complete.
            </h6>
            <h6 id="modal-text-link" className="text-[#ffc71f] text-sm mt-4 text-center" onClick={termsModalHandler}>
              Terms & Conditions
            </h6>
            <Tooltip
              id="first-time-tooltip"
              content={firstTimeMessage()}
              color="default"
              className="text-center mx-auto"
            >
              <h6 id="first-time-label" className="text-[#ffc71f] font-medium text-base mt-6 text-center">First Time?</h6>
            </Tooltip>
            <TCModal
              viewstate={visible}
              closehandler={termsModalCloseHandler}
              closebtn={termsModalCloseHandler}
            />
          </div>
        }
      />
    );
  } else if (loading) {
    return (
      <AuthContainer
        content={
          <div className="auth-content-container">
            {" "}
            <Loading id="login-loading" size="xl"></Loading>
          </div>
        }
      />
    );
  } else if (loginSuccess) {
    return (
      <AuthContainer
        content={
          <div className="auth-content-container">
            <p id="email-success-message">
              {" "}
              Email sent. Please be sure to check your spam folder if you do not
              see it. You may now close this tab{" "}
            </p>
          </div>
        }
      />
    );
  }
};

export default SignInPage;
