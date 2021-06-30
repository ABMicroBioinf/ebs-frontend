/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function CPOAnalysis() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>CPO Analysis</div>
    </>
  );
}

export default withAuth(CPOAnalysis);
