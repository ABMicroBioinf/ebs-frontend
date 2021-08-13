/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-09 08:26:21
 * @modify date 2021-08-09 08:26:21
 * @desc [description]
 */
import withAuth from "../../middleware/withAuth";
import { useEffect, useState } from "react";

import TopNav from "../../components/global/TopNav";

import { Grid } from "semantic-ui-react";

function CoreAnalysis() {
  const [wideView, setWideView] = useState(false);

  useEffect(() => {
    console.log("core");
  }, []);

  return (
    <>
      <TopNav />
      <div
        className={`${
          wideView
            ? "ebs-left-side-content-wide-frame"
            : "ebs-left-side-content-frame"
        }`}
      >
        List of Analysis placeholder
      </div>
      <div
        className={`${
          wideView
            ? "ebs-main-content-with-left-side-wide-frame"
            : "ebs-main-content-with-left-side-frame"
        }`}
      >
        <Grid padded>
          <Grid.Row>
            <Grid.Column>Core Analysis</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(CoreAnalysis);
