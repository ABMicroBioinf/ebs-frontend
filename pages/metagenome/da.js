/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function MetagenomeDA() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Metagenome Dataset Analysis</div>
    </>
  );
}

export default withAuth(MetagenomeDA);
