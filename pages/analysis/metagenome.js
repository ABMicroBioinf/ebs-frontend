/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function MetagenomeAnalysis() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Metagemnome Analysis</div>
    </>
  );
}

export default withAuth(MetagenomeAnalysis);
