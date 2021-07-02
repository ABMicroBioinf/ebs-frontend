/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import _ from "lodash";
import { useState } from "react";
import { useEBSData } from "./EBSDataView";

import {
  Accordion,
  Form,
  Menu,
  Label,
  Item,
  Checkbox,
  Segment,
  Input,
} from "semantic-ui-react";

export default function Filters() {
  const { columnData, rowData, setRowData } = useEBSData();
  const { dataset, primary } = rowData;

  // alias names are hardcoded. it needs to be fixed in the future
  const organism = _.countBy(dataset.map((data) => data["Organism"]).sort());
  const instrument = _.countBy(
    dataset.map((data) => data["Instrument (EXP)"]).sort()
  );
  const platform = _.countBy(
    dataset.map((data) => data["Platform (EXP)"]).sort()
  );
  const libraryLayout = _.countBy(
    dataset.map((data) => data["Library Layout (EXP)"]).sort()
  );
  const librarySource = _.countBy(
    dataset.map((data) => data["Library Source"]).sort()
  );

  const OrganismForm = (
    <Form inverted>
      {organism &&
        Object.keys(organism).map((key, index) => {
          return (
            <Item key={index}>
              <Form.Checkbox label={key} name="organism" value={key} />
              <Label color="grey">{organism[key]}</Label>
            </Item>
          );
        })}
    </Form>
  );

  const InstrumentForm = (
    <Form inverted>
      {instrument &&
        Object.keys(instrument).map((key, index) => {
          return (
            <Item key={index}>
              <Checkbox label={key} name="instrument" value={key} />
              <Label color="grey">{instrument[key]}</Label>
            </Item>
          );
        })}
    </Form>
  );

  const PlatformForm = (
    <Form inverted>
      {platform &&
        Object.keys(platform).map((key, index) => {
          return (
            <Item key={index}>
              <Checkbox label={key} name="instrument" value={key} />
              <Label color="grey">{platform[key]}</Label>
            </Item>
          );
        })}
    </Form>
  );

  const LibraryLayoutForm = (
    <Form inverted>
      {libraryLayout &&
        Object.keys(libraryLayout).map((key, index) => {
          return (
            <Item key={index}>
              <Checkbox label={key} name="instrument" value={key} />
              <Label color="grey">{libraryLayout[key]}</Label>
            </Item>
          );
        })}
    </Form>
  );

  const LibrarySourceForm = (
    <Form inverted>
      {librarySource &&
        Object.keys(librarySource).map((key, index) => {
          return (
            <Item key={index}>
              <Checkbox label={key} name="instrument" value={key} />
              <Label color="grey">{librarySource[key]}</Label>
            </Item>
          );
        })}
    </Form>
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
        <Input icon="search" placeholder="Search..." />
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
            content="Library Resource"
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
