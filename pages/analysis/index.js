/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";
import { Grid, Placeholder, List } from "semantic-ui-react";

function Isolate() {
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
            <Grid.Column>
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
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
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
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(Isolate);
