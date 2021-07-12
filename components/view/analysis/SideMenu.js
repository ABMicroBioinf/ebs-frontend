import { Grid, Icon, List, Menu, Segment } from "semantic-ui-react";

export default function AnalysisSideMenu(props) {
  const { wideView, setWideView } = props;

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
        <List>
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
        </List>
        {/* <Accordion inverted fluid as={Menu} vertical>
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
            <Accordion.Content
              active={activeIndex[1]}
              content={InstrumentForm}
            />
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
        </Accordion> */}
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
