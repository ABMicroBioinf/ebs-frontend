/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import _ from "lodash";
import { useCallback, useReducer, useState } from "react";
import { useEBSData } from "./EBSDataView";

import {
  Accordion,
  Menu,
  Label,
  Checkbox,
  Segment,
  Input,
  Grid,
} from "semantic-ui-react";

/**
 * Search Tool
 */
function Search(props) {
  const { setRowData } = props;

  const initialSearchState = {
    loading: false,
    searchValue: "",
  };

  function searchReducer(state, action) {
    switch (action.searchType) {
      case "CLEAN_QUERY":
        return initialSearchState;
      case "START_SEARCH":
        return { ...state, loading: true, searchValue: action.searchQuery };
      case "FINISH_SEARCH":
        return { ...state, loading: false, searchValue: action.searchQuery };
      case "NOT_FOUND":
        return { ...state, loading: false };

      default:
        throw new Error();
    }
  }

  const [searchState, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchState
  );
  const { searchValue } = searchState;

  const handleSearchChange = useCallback((e, data) => {
    dispatchSearch({ searchType: "START_SEARCH", searchQuery: data.value });
    if (data.value.length === 0) {
      dispatchSearch({ searchType: "CLEAN_QUERY" });
      setRowData({
        type: "SET_HISTORY",
        module: "search",
        search: "",
      });
      setRowData({
        type: "APPLY_HISTORY",
      });
      return;
    }

    dispatchSearch({
      searchType: "FINISH_SEARCH",
      searchQuery: data.value,
    });
    setRowData({
      type: "SET_HISTORY",
      module: "search",
      search: data.value,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  return (
    <Input
      onChange={handleSearchChange}
      value={searchValue}
      icon="search"
      placeholder="Search..."
      type="text"
    />
  );
}

export default function Filters() {
  const { rowData, setRowData } = useEBSData();
  const { ORIGIN } = rowData;

  const statisticRef = ORIGIN.slice();

  // alias names are hardcoded. it needs to be fixed in the future
  const organism = _.countBy(
    statisticRef.map((data) => data["sample.organism"]).sort()
  );
  const instrument = _.countBy(
    statisticRef.map((data) => data["experiment.instrument"]).sort()
  );
  const platform = _.countBy(
    statisticRef.map((data) => data["experiment.platform"]).sort()
  );
  const libraryLayout = _.countBy(
    statisticRef.map((data) => data["experiment.libraryLayout"]).sort()
  );
  const librarySource = _.countBy(
    statisticRef.map((data) => data["experiment.librarySource"]).sort()
  );

  const OrganismForm = (
    <Grid className="ebs-filters-submenu">
      {organism &&
        Object.keys(organism).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  label={key}
                  name="sample.organism"
                  value={key}
                />
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Label color="grey">{organism[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  const InstrumentForm = (
    <Grid className="ebs-filters-submenu">
      {instrument &&
        Object.keys(instrument).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  label={key}
                  name="experiment.instrument"
                  value={key}
                />
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Label color="grey">{instrument[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  const PlatformForm = (
    <Grid className="ebs-filters-submenu">
      {platform &&
        Object.keys(platform).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  label={key}
                  name="experiment.platform"
                  value={key}
                />
              </Grid.Column>

              <Grid.Column width={2} floated="right">
                <Label color="grey">{platform[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  const LibraryLayoutForm = (
    <Grid className="ebs-filters-submenu">
      {libraryLayout &&
        Object.keys(libraryLayout).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  label={key}
                  name="experiment.libraryLayout"
                  value={key}
                />
              </Grid.Column>

              <Grid.Column width={2} floated="right">
                <Label color="grey">{libraryLayout[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  const LibrarySourceForm = (
    <Grid className="ebs-filters-submenu">
      {librarySource &&
        Object.keys(librarySource).map((key, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>
                <Checkbox
                  className="ebs-inverted"
                  label={key}
                  name="experiment.librarySource"
                  value={key}
                />
              </Grid.Column>

              <Grid.Column width={2} floated="right">
                <Label color="grey">{librarySource[key]}</Label>
              </Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );

  const [activeIndex, setActiveIndex] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const handleClick = (e, data) => {
    const { index, active } = data;
    setActiveIndex({ ...activeIndex, [index]: !active });
  };

  return (
    <>
      <Segment inverted>
        <Search setRowData={setRowData} />
      </Segment>
      <Accordion inverted fluid as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex[0]}
            content="Organism"
            index={0}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex[0]} content={OrganismForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex[1]}
            content="Instrument"
            index={1}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex[1]} content={InstrumentForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex[2]}
            content="Platform"
            index={2}
            onClick={handleClick}
          />
          <Accordion.Content active={activeIndex[2]} content={PlatformForm} />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex[3]}
            content="Library Layout"
            index={3}
            onClick={handleClick}
          />
          <Accordion.Content
            active={activeIndex[3]}
            content={LibraryLayoutForm}
          />
        </Menu.Item>

        <Menu.Item>
          <Accordion.Title
            active={activeIndex[4]}
            content="Library Source"
            index={4}
            onClick={handleClick}
          />
          <Accordion.Content
            active={activeIndex[4]}
            content={LibrarySourceForm}
          />
        </Menu.Item>
      </Accordion>
    </>
  );
}
