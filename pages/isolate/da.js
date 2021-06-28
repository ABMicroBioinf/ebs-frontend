/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function IsolateDA() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Isolate Dataset Analysis</div>
    </>
  );
}

export default withAuth(IsolateDA);
