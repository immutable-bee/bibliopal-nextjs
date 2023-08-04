import { useState, useMemo, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Input, Loading, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import AuthContainer from "../../components/containers/AuthContainer";
import TCModal from "../../components/modals/TCModal";
import IconEnvelope from "../../assets/svg/icons_envelope.svg";
import IconGoogle from "../../assets/svg/icon-google.svg";
import ConsumerAuthContainer from "../../components/containers/ConsumerAuthContainer";
import BusinessAuthContainer from "../../components/containers/BusinessAuthContainer";

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

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [view, setView] = useState("");

  const { type } = router.query;

  useEffect(() => {
    if (type) {
      setView(type);
      setLoading(false);
    }
  }, [type]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
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

  return loading ? (
    <Loading />
  ) : type === "consumer" ? (
    <ConsumerAuthContainer />
  ) : (
    <BusinessAuthContainer />
  );
};

export default SignInPage;
