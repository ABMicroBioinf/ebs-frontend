/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";
import { Grid, Header, List } from "semantic-ui-react";

import { swarmPlotData } from "./swamPlotDataExample";
import { barData } from "./barDataExample";
import { pieData } from "./pieDataExample";
import { sunburstData } from "./sunburstDataExample";

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/swarmplot
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveSwarmPlot = ({ data /* see data tab */ }) => (
  <ResponsiveSwarmPlot
    data={data}
    groups={["group A", "group B", "group C"]}
    identity="id"
    value="price"
    valueFormat="$.2f"
    valueScale={{ type: "linear", min: 0, max: 500, reverse: false }}
    size={{ key: "volume", values: [4, 20], sizes: [6, 20] }}
    forceStrength={4}
    simulationIterations={100}
    borderColor={{
      from: "color",
      modifiers: [
        ["darker", 0.6],
        ["opacity", 0.5],
      ],
    }}
    margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
    axisTop={{
      orient: "top",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "group if vertical, price if horizontal",
      legendPosition: "middle",
      legendOffset: -46,
    }}
    axisRight={{
      orient: "right",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price if vertical, group if horizontal",
      legendPosition: "middle",
      legendOffset: 76,
    }}
    axisBottom={{
      orient: "bottom",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "group if vertical, price if horizontal",
      legendPosition: "middle",
      legendOffset: 46,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price if vertical, group if horizontal",
      legendPosition: "middle",
      legendOffset: -76,
    }}
  />
);

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/sunburst
import { ResponsiveSunburst } from "@nivo/sunburst";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveSunburst = ({ data /* see data tab */ }) => (
  <ResponsiveSunburst
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    id="name"
    value="loc"
    cornerRadius={2}
    borderColor={{ theme: "background" }}
    colors={{ scheme: "nivo" }}
    childColor={{ from: "color", modifiers: [["brighter", 0.1]] }}
    enableArcLabels={true}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
  />
);

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data /* see data tab */ }) => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat={{ format: "", enabled: false }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

function Analysis() {
  return (
    <>
      <TopNav />
      <div className="ebs-left-side-content-frame">
        <List bulleted>
          <List.Item>
            TB-Analysis
            <List.List>
              <List.Item>Analysis 1</List.Item>
              <List.Item>Analysis 2</List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            CPO-Analysis
            <List.List>
              <List.Item>Analysis 1</List.Item>
              <List.Item>Analysis 2</List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            M-Analysis
            <List.List>
              <List.Item>Analysis 1</List.Item>
              <List.Item>Analysis 2</List.Item>
            </List.List>
          </List.Item>
        </List>
      </div>
      <div className="ebs-main-content-with-left-side-frame">
        <Grid padded>
          <Grid.Row>
            <Grid.Column style={{ height: "400px" }}>
              <Header as="h1">Chart Examples</Header>
              <MyResponsiveSwarmPlot data={swarmPlotData} />
              <MyResponsiveBar data={barData} />
              <MyResponsivePie data={pieData} />
              <MyResponsiveSunburst data={sunburstData} />
            </Grid.Column>
          </Grid.Row>

          {/* <Grid.Row>
            <Grid.Column>
              <Header as="h1">Sequence data will be placed below</Header>
              <Placeholder fluid>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Grid.Column>
          </Grid.Row> */}
        </Grid>
      </div>
    </>
  );
}

export default withAuth(Analysis);
