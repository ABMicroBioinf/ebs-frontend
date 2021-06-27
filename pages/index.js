/**
 * Author: Jongil Yoon <Jiysait@gmail.com>
 */
import Link from "next/link";
import TopNav from "../components/TopNav";
import withAuth from "../middleware/withAuth";

/**
 * Next.js recommend to handle redirection in backend
 * following code needs to be fixed
 * @returns
 */
function Home() {
  return (
    <div>
      <TopNav />
      <div>It will be an overview page</div>
      <br />
      <br />
      <br />
      <Link href="/sequences">
        <a>Sequences</a>
      </Link>
    </div>
  );
}

export default withAuth(Home);
