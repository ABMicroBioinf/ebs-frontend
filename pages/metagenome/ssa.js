/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";

function MetagenomeSSA() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Metagenome Single Sample Analysis</div>
    </>
  );
}

export default withAuth(MetagenomeSSA);
