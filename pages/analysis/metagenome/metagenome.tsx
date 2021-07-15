// @ts-check
/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:10:04
 * @modify date 2021-07-15 13:10:11
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";

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
