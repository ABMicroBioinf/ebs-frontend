import { useState } from "react";
import { Accordion, Form, Menu } from "semantic-ui-react";

const OrganismForm = (
  <Form inverted>
    <Form.Group grouped>
      <Form.Checkbox label="1" name="organism" value="1" />
      <Form.Checkbox label="2" name="organism" value="2" />
      <Form.Checkbox label="3" name="organism" value="3" />
      <Form.Checkbox label="4" name="organism" value="4" />
    </Form.Group>
  </Form>
);

const InstrumentForm = (
  <Form inverted>
    <Form.Group grouped>
      <Form.Checkbox label="1" name="instrument" value="1" />
      <Form.Checkbox label="2" name="instrument" value="2" />
      <Form.Checkbox label="3" name="instrument" value="3" />
      <Form.Checkbox label="4" name="instrument" value="4" />
    </Form.Group>
  </Form>
);

const PlatformForm = (
  <Form inverted>
    <Form.Group grouped>
      <Form.Checkbox label="1" name="platform" value="1" />
      <Form.Checkbox label="2" name="platform" value="2" />
      <Form.Checkbox label="3" name="platform" value="3" />
      <Form.Checkbox label="4" name="platform" value="4" />
    </Form.Group>
  </Form>
);

const LibraryLayoutForm = (
  <Form inverted>
    <Form.Group grouped>
      <Form.Checkbox label="1" name="library_layout" value="1" />
      <Form.Checkbox label="2" name="library_layout" value="2" />
      <Form.Checkbox label="3" name="library_layout" value="3" />
      <Form.Checkbox label="4" name="library_layout" value="4" />
    </Form.Group>
  </Form>
);

const LibraryResourceForm = (
  <Form inverted>
    <Form.Group grouped>
      <Form.Checkbox label="1" name="library_resource" value="1" />
      <Form.Checkbox label="2" name="library_resource" value="2" />
      <Form.Checkbox label="3" name="library_resource" value="3" />
      <Form.Checkbox label="4" name="library_resource" value="4" />
    </Form.Group>
  </Form>
);

export default function Filters() {
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
          content={LibraryResourceForm}
        />
      </Menu.Item>
    </Accordion>
  );
}
