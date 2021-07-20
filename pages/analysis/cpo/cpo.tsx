/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:09:14
 * @modify date 2021-07-15 13:09:20
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";

import TopNav from "../../../components/global/TopNav";

/**
 * CPOAnalysis
 * @returns - Analysis of CPO page component
 */
function CPOAnalysis(): JSX.Element {
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
