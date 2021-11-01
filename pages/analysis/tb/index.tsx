/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:09:39
 * @modify date 2021-07-15 13:09:41
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";
import React, { useEffect, useState } from "react";

import { Grid, Icon, Menu, Segment, Tab } from "semantic-ui-react";
import TopNav from "../../../components/global/TopNav";
import TabMenu from "../../../components/global/Tab";
import AssemblyView from "../../../components/views/analysis/AssemblyView";
import AnnotationView from "../../../components/views/analysis/AnnotationView";
import MLSTView from "../../../components/views/analysis/MLSTView";
import ResistomeView from "../../../components/views/analysis/ResistomeView";
import VirulomeView from "../../../components/views/analysis/VirulomeView";
import TBSummaryView from "../../../components/views/analysis/TBSummaryView";

/**
 * TBAnalysis
 * @returns - TB Main View Component
 */
function TBAnalysis() {
  const [currentTab, setCurrentTab] = useState();
  const [wideView, setWideView] = useState(false);

  const handleTabChange = (e, data) => setCurrentTab(data);
  // const handleTabChange = (e, activeIndex) => {
  //   console.log(activeIndex);
  // };

  const panes = [
    {
      menuItem: "Assembly",
      render: function getContent() {
        return <AssemblyView />;
      },
    },
    {
      menuItem: "Annotation",
      render: function getContent() {
        return <AnnotationView />;
      },
    },
    {
      menuItem: "MLST",
      render: function getContent() {
        return <MLSTView />;
      },
    },
    {
      menuItem: "Resistome",
      render: function getContent() {
        return <ResistomeView />;
      },
    },
    {
      menuItem: "Virulome",
      render: function getContent() {
        return <VirulomeView />;
      },
    },
    {
      menuItem: "TBProfile",
      render: function getContent() {
        return <TBSummaryView />;
      },
    },
  ];

  useEffect(() => {
    console.log(currentTab?.panes.at(currentTab?.activeIndex).menuItem);
  }, [currentTab]);

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
        {wideView ? (
          <Grid
            verticalAlign="middle"
            centered
            padded
            className="ebs-left-side-as-button-frame"
            onClick={() => {
              setWideView(!wideView);
            }}
          >
            <Grid.Row>
              <Grid.Column className="ebs-paddingless">
                <Icon name="angle double right" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <>
            {/* <Segment className="ebs-borderless ebs-shadowless"></Segment> */}
            <div className="ebs-scrollable-inner">
              {/* <Accordion
                className="ebs-borderless ebs-shadowless"
                fluid
                as={Menu}
                vertical
              ></Accordion> */}
            </div>
            <Segment className="ebs-borderless ebs-shadowless">
              <Menu.Item
                onClick={() => {
                  setWideView(!wideView);
                }}
              >
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>Wide View</Grid.Column>
                    <Grid.Column textAlign="right">
                      <Icon name="angle double left" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Menu.Item>
            </Segment>
          </>
        )}
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
              {/* <TabMenu */}
              <Tab panes={panes} onTabChange={handleTabChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(TBAnalysis);
