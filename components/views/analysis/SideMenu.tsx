/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 00:34:13
 * @modify date 2021-07-15 13:20:56
 * @desc [description]
 */
import _ from "lodash";
import { useState } from "react";
import {
  Accordion,
  Checkbox,
  Grid,
  Header,
  Icon,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { EBSTableDashboardStateContext } from "../../../modules/table/interfaces/EBSContexts";

/**
 * AnalysisSideMen
 * @param param -
 * @returns -
 */
function AnalysisSideMenu({
  ebsTableState,
  wideView,
  setEBSTableState,
  setWideView,
}: EBSTableDashboardStateContext): JSX.Element {
  const { RECORDS_STATE_REF } = ebsTableState;
  const [activeIndex, setActiveIndex] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [activeRadio, setActiveRadio] = useState("");

  const handleClick = (e, data) => {
    const { index, active } = data;
    setActiveIndex({ ...activeIndex, [index]: !active });
  };

  const handleChange = (e, data) => {
    // Temporary
    setActiveRadio(data.value);
  };

  const statisticRef = RECORDS_STATE_REF.slice();
  const notDrugCol = [
    "main_lin",
    "sub_lin",
    "DR_type",
    "num_dr_variants",
    "num_other_variants",
  ];

  const analysis_1_rifampicin = _.countBy(
    statisticRef.map((row) => row.data["rifampicin"]).sort()
  );

  const analysis_1_isoniazid = _.countBy(
    statisticRef.map((row) => row.data["isoniazid"]).sort()
  );

  const analysis_1_pyrazinamide = _.countBy(
    statisticRef.map((row) => row.data["pyrazinamide"]).sort()
  );

  const analysis_1_ethambutol = _.countBy(
    statisticRef.map((row) => row.data["ethambutol"]).sort()
  );

  const Analysis_1 = (
    <Grid className="ebs-filters-submenu">
      <Grid.Row>
        <Header inverted as="h4">
          rifampicin
        </Header>
      </Grid.Row>
      {analysis_1_rifampicin &&
        Object.keys(analysis_1_rifampicin).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  radio
                  label={key}
                  name="rifampicin"
                  value={key}
                  checked={activeRadio === key}
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Label color="grey">{analysis_1_rifampicin[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}

      <Grid.Row>
        <Header inverted as="h4">
          isoniazid
        </Header>
      </Grid.Row>
      {analysis_1_isoniazid &&
        Object.keys(analysis_1_isoniazid).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  radio
                  label={key}
                  name="isoniazid"
                  value={key}
                  checked={activeRadio === key}
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Label color="grey">{analysis_1_isoniazid[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}

      <Grid.Row>
        <Header inverted as="h4">
          ethambutol
        </Header>
      </Grid.Row>
      {analysis_1_ethambutol &&
        Object.keys(analysis_1_ethambutol).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  radio
                  label={key}
                  name="isoniazid"
                  value={key}
                  checked={activeRadio === key}
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Label color="grey">{analysis_1_ethambutol[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  return wideView ? (
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
      <Segment inverted>{/* <Search setRowData={setRowData} /> */}</Segment>
      <div className="ebs-scrollable-inner">
        {/* <List>
          <List.Item>
            <List.Icon name="flask" />
            <List.Content>Analysis_1</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="flask" />
            <List.Content>Analysis_2</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="flask" />
            <List.Content>Analysis_3</List.Content>
          </List.Item>
        </List> */}
        <Accordion inverted fluid as={Menu} vertical>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex[0]}
              content="Analysis 1"
              index={0}
              onClick={handleClick}
            />
            <Accordion.Content active={activeIndex[0]} content={Analysis_1} />
          </Menu.Item>

          <Menu.Item>
            <Accordion.Title
              active={activeIndex[1]}
              content="Analysis 2"
              index={1}
              onClick={handleClick}
            />
            {/* <Accordion.Content
              active={activeIndex[1]}
              content={InstrumentForm}
            /> */}
          </Menu.Item>

          <Menu.Item>
            <Accordion.Title
              active={activeIndex[2]}
              content="Analysis 3"
              index={2}
              onClick={handleClick}
            />
            {/* <Accordion.Content active={activeIndex[2]} content={PlatformForm} /> */}
          </Menu.Item>
        </Accordion>
      </div>
      <Segment inverted>
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
  );
}

export default AnalysisSideMenu;
