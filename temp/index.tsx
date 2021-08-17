/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 11:08:05
 * @modify date 2021-07-15 13:16:57
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";
import { useState } from "react";

import TopNav from "../../../components/global/TopNav";
import { Grid } from "semantic-ui-react";
import SequencesVizView from "../../../components/views/sequences/VizView";
import SequencesSideMenu from "../../../components/views/sequences/SideMenu";

/**
 * Sequence Page
 * @returns - Sequence Main View Component
 */
function SequenceMG(): JSX.Element {
  const MODULE = "MG";
  const [wideView, setWideView] = useState(false);

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
        <SequencesSideMenu
          module={MODULE}
          wideView={wideView}
          setWideView={setWideView}
        />
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
            <Grid.Column>
              <SequencesVizView module={MODULE} path="/sequences/mg" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(SequenceMG);
