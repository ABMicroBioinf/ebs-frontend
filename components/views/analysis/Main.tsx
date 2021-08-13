/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:33:47
 * @modify date 2021-07-15 13:20:48
 * @desc [description]
 */
import _ from "lodash";
import { useReducer, useState } from "react";

import TopNav from "../../../components/global/TopNav";
import {
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Placeholder,
} from "semantic-ui-react";
import AnalysisSideMenu from "./SideMenu";
import { EBSTableStateReducer } from "../../../modules/table/core/libs/reducer";
import { getEBSTableInitialState } from "../../../modules/table/core/EBSTableStateHandler";
import { EBSTabularDataStateContext } from "../../../modules/table/core/models/EBSDataTypes";
import EBSTable from "../../../modules/table/EBSTable";

function TBMainView({
  ebsTabularData,
}: EBSTabularDataStateContext): JSX.Element {
  const [ebsTableState, setEBSTableState] = useReducer(
    EBSTableStateReducer,
    getEBSTableInitialState(ebsTabularData)
  );

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
        {ebsTableState.headers.length > 0 &&
        ebsTableState.records.length >= 0 ? (
          <AnalysisSideMenu
            ebsTableState={ebsTableState}
            wideView={wideView}
            setEBSTableState={setEBSTableState}
            setWideView={setWideView}
          />
        ) : (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
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
              {/* <Header size="large">Statistic</Header>
              {CUSTOM_ROWS.length > 0 ? (
                <SequencesTotalCount rowData={rowData} />
              ) : (
                <Dimmer active>
                  <Loader>Loading</Loader>
                </Dimmer>
              )} */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {ebsTableState.headers.length > 0 &&
              ebsTableState.records.length >= 0 ? (
                <EBSTable
                  ebsTableState={ebsTableState}
                  setEBSTableState={setEBSTableState}
                />
              ) : (
                <>
                  <Placeholder fluid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Grid>
                      <Grid.Column textAlign="center">
                        <Header icon>
                          <Icon name="table" />
                        </Header>
                      </Grid.Column>
                    </Grid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default TBMainView;
