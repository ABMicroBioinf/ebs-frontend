import { Grid, List } from "semantic-ui-react";
import MultipleFileUpload from "./components/MultipleFileUpload";

export default function Upload() {
    return (
        <Grid className={"middle aligned"} style={{ height: '100vh' }}>
            <Grid.Column textAlign="center">
                <MultipleFileUpload />
                <List>
                    <List.Item as='a' href="https://github.com/jiysait/bio_front/blob/main/components/MultipleFileUpload.js">Frontend code</List.Item>
                    <List.Item as='a' href="https://github.com/jiysait/bio_back/tree/main/src/multiple_files_upload/api">Backend code</List.Item>
                    <List.Item as='a' href="/">Back to home</List.Item>
                </List>
            </Grid.Column>
        </Grid>
    )
}