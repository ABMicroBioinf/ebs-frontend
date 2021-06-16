/**
 * Author: Jongil Yoon
 */

import { Grid, List } from "semantic-ui-react";
import SingleFileUpload from "./components/SingleFileUpload";

export default function Upload() {
  return (
    <Grid className={"middle aligned"} style={{ height: "100vh" }}>
      <Grid.Column textAlign="center">
        <SingleFileUpload />
        <List>
          <List.Item
            as="a"
            href="https://github.com/jiysait/bio_front/blob/main/components/SingleFileUpload.js"
          >
            Frontend code
          </List.Item>
          <List.Item
            as="a"
            href="https://github.com/jiysait/bio_back/tree/main/src/single_file_upload/api"
          >
            Backend code
          </List.Item>
          <List.Item as="a" href="/">
            Back to home
          </List.Item>
        </List>
      </Grid.Column>
    </Grid>
  );
}
