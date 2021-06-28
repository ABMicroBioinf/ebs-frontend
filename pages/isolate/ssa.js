/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function IsolateSSA() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Isolate Single Sample Analysis</div>
    </>
  );
}

export default withAuth(IsolateSSA);
