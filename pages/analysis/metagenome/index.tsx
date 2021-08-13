/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:10:04
 * @modify date 2021-07-15 13:10:11
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";

import TopNav from "../../../components/global/TopNav";
import React, { useState } from "react";
import { Grid, Tab } from "semantic-ui-react";
import TabMenu from "../../../components/global/Tab";

/**
 * MetagenomeAnalysis
 * @returns - Analysis of Metagenome page component
 */
function MetagenomeAnalysis(): JSX.Element {
  const [wideView, setWideView] = useState(false);

  const panes = [
    {
      menuItem: "Metagenome Analysis 1",
      render: function getContent() {
        return <Tab.Pane>Metagenome Analysis 1 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "Metagenome Analysis 2",
      render: function getContent() {
        return <Tab.Pane>Metagenome Analysis 2 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "Metagenome Analysis 3",
      render: function getContent() {
        return <Tab.Pane>Metagenome Analysis 3 Content</Tab.Pane>;
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

export default withAuth(MetagenomeAnalysis);
