// @ts-check
/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:09:14
 * @modify date 2021-07-15 13:09:20
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";

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
