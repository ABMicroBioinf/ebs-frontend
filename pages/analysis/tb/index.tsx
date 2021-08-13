/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:09:39
 * @modify date 2021-07-15 13:09:41
 * @desc [description]
 */
import withAuth from "../../../middleware/withAuth";
import React, { useState } from "react";

import { Grid, Tab } from "semantic-ui-react";
import TopNav from "../../../components/global/TopNav";
import TabMenu from "../../../components/global/Tab";

/**
 * TBAnalysis
 * @returns - TB Main View Component
 */
function TBAnalysis() {
  const [wideView, setWideView] = useState(false);

  const panes = [
    {
      menuItem: "Table 1",
      render: function getContent() {
        return <Tab.Pane>TB Analysis 1 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "Table 2",
      render: function getContent() {
        return <Tab.Pane>TB Analysis 2 Content</Tab.Pane>;
      },
    },
    {
      menuItem: "Table 3",
      render: function getContent() {
        return <Tab.Pane>TB Analysis 3 Content</Tab.Pane>;
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
// function TBAnalysis() {
//   const [ebsTabularData, setEBSTabularData] = useState({
//     title: "",
//     placementURI: "",
//     headers: [],
//     records: [],
//   });

//   useEffect(() => {
//     const converted = Object.entries(TBPROFILER).map(([key, value]) => {
//       const obj = {};
//       obj["sample"] = key;
//       if (value === Object(value) && value !== null && value !== undefined) {
//         Object.entries(value).map(([k, v]) => {
//           obj[k] = v;
//         });
//       }
//       return obj;
//     });

//     const DEFAULT_SCHEME = getSchemeDefault(converted[0]);
//     const CUSTOMIZED_SCHEME = applyCustomFields(flatColumns(DEFAULT_SCHEME));

//     setEBSTabularData({
//       title: "TBProfiler",
//       placementURI: "analysis/tb",
//       headers: CUSTOMIZED_SCHEME,
//       records: flatRows(converted),
//     });
//   }, []);

//   return (
//     ebsTabularData.headers.length > 0 &&
//     ebsTabularData.records.length > 0 && (
//       <TBMainView
//         ebsTabularData={ebsTabularData}
//         setEBSTabularData={setEBSTabularData}
//       />
//     )
//   );
// }

export default withAuth(TBAnalysis);
