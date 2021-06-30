/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function TBAnalysis() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>TB Analysis</div>
    </>
  );
}

export default withAuth(TBAnalysis);
