/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useRouter } from "next/router";
import { verify } from "../../middleware/verify";
import TopNav from "../../components/TopNav";
import withAuth from "../../middleware/withAuth";

function Sequence() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <TopNav />
      {slug}
    </>
  );
}

export async function getServerSideProps(context) {
  // Gatekeeper
  const authentication = verify(context);
  if (authentication.status !== 200) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 401, //unauthorized
      },
    };
  }
  return {
    props: {
      data: [],
    },
  };
}

export default withAuth(Sequence);
