import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loading } from "@nextui-org/react";
import AuthContainer from "../../components/containers/AuthContainer";
import ConsumerAuthContainer from "../../components/containers/ConsumerAuthContainer";
import BusinessAuthContainer from "../../components/containers/BusinessAuthContainer";

const SignInPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    if (type) {
      setLoading(false);
    }
  }, [type]);

  const [loading, setLoading] = useState(true);

  if (status == "loading")
    return (
      <AuthContainer id="login-loader" content={<Loading size={"lg"} />} />
    );

  return loading ? (
    <AuthContainer id="login-loader" content={<Loading size={"lg"} />} />
  ) : type === "consumer" ? (
    <ConsumerAuthContainer />
  ) : (
    <BusinessAuthContainer />
  );
};

export default SignInPage;
