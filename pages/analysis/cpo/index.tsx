/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:09:14
 * @modify date 2021-07-15 13:09:20
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";

import TopNav from "../../../components/global/TopNav";
import React, { useState } from "react";
import { Grid, Tab } from "semantic-ui-react";
import TabMenu from "../../../components/global/Tab";

/**
 * CPOAnalysis
 * @returns - Analysis of CPO page component
 */
function CPOAnalysis(): JSX.Element {
  const [wideView, setWideView] = useState(false);

  const panes = [
    {
      menuItem: "CPO Analysis 1",
      render: function getContent() {
        return <Tab.Pane>CPO Analysis 1 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "CPO Analysis 2",
      render: function getContent() {
        return <Tab.Pane>CPO Analysis 2 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "CPO Analysis 3",
      render: function getContent() {
        return <Tab.Pane>CPO Analysis 3 Content</Tab.Pane>;
      },
    },
  ];

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
        filter placeholder
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
              <TabMenu panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(CPOAnalysis);
