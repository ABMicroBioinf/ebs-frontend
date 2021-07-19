/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:20:13
 * @modify date 2021-07-15 13:20:19
 * @desc [description]
 */
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";

import { EBSTableStateReducer } from "../../../modules/table/reducers/reducer";
import { EBSTabularDataContext } from "../../../modules/table/interfaces/EBSContexts";
import { getEBSTableInitialState } from "../../../modules/table/helpers/EBSTableStateHandler";

import { SequencesTotalCount } from "./Statistics";
import SideMenu from "./SideMenu";
import EBSTableData from "../../../modules/table/EBSTableData";

import TopNav from "../../global/TopNav";
import {
  Dimmer,
  Loader,
  Grid,
  Header,
  Icon,
  Placeholder,
} from "semantic-ui-react";

/**
 * Sequences Main View
 * @param {EBSTabularDataContext} props
 * @returns {JSX.Element} - Combination of components
 */
function SequencesMainView({ ebsTabularData }: EBSTabularDataContext) {
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
        ebsTableState.records.length > 0 ? (
          <SideMenu
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
              <Header size="large">Statistic</Header>
              {ebsTableState.headers.length > 0 &&
              ebsTableState.records.length > 0 ? (
                <SequencesTotalCount ebsTableState={ebsTableState} />
              ) : (
                <Dimmer active>
                  <Loader>Loading</Loader>
                </Dimmer>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {ebsTableState.headers.length > 0 &&
              ebsTableState.records.length > 0 ? (
                <EBSTableData
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

export default SequencesMainView;
