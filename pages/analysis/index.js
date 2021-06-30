/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function Isolate() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Isolate Main</div>
    </>
  );
}

export default withAuth(Isolate);
