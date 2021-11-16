/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:09:39
 * @modify date 2021-07-15 13:09:41
 * @desc [description]
 */
import withAuth from "../../middleware/withAuth";
import React, { useEffect, useState } from "react";

import { Grid, Icon, Menu, Segment, Tab } from "semantic-ui-react";
import TopNav from "../../components/global/TopNav";
import AssemblyView from "../../components/views/isolates/AssemblyView";
import AnnotationView from "../../components/views/isolates/AnnotationView";
import MLSTView from "../../components/views/isolates/MLSTView";
import ResistomeView from "../../components/views/isolates/ResistomeView";
import VirulomeView from "../../components/views/isolates/VirulomeView";
import TBSummaryView from "../../components/views/isolates/TBSummaryView";
import SequenceView from "../../components/views/isolates/SequenceView";
import SideMenu from "../../components/views/isolates/SideMenu";

/**
 * Isolates
 * @returns - Isolates Main View Component
 */
function Isolates() {
  const handleTabChange = (e, data) => setCurrentTab(data);

  const panes = [
    {
      menuItem: "Sequence",
      render: function getContent() {
        return <SequenceView />;
      },
    },
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

  const [currentTab, setCurrentTab] = useState({
    activeIndex: 0,
    grid: { paneWidth: 12, tabWidth: 4 },
    menu: { attached: true, tabular: true },
    onTabChange: handleTabChange,
    panes: panes,
    renderActiveOnly: true,
  });
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
        {currentTab && (
          <SideMenu
            currentTab={currentTab.panes[currentTab.activeIndex].menuItem}
            wideView={wideView}
            setWideView={setWideView}
          />
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
              <Tab panes={panes} onTabChange={handleTabChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(Isolates);
