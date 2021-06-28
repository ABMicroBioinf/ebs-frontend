/**
 * Author: Jongil Yoon <Jiysait@gmail.com>
 */
import Link from "next/link";
import TopNav from "../components/TopNav";
import withAuth from "../middleware/withAuth";

import {
  Container,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";

/**
 * Next.js recommend to handle redirection in backend
 * following code needs to be fixed
 * @returns
 */
function Home() {
  return (
    <>
      <TopNav />
      <Grid padded>
        <Grid.Column>
          <Container>
            <Header as="h2" icon textAlign="center">
              <Icon name="dna" textalign="center" />
              <Header.Content>Landing Page</Header.Content>
            </Header>
            <Segment vertical>Available end points</Segment>
            <Segment vertical>
              <List>
                <List.Item>
                  <List.Icon name="file" />
                  <List.Content>
                    <List.Header>
                      <Link href="/">Overview</Link>
                    </List.Header>
                    <List.Description>
                      A Landing page shows overview
                    </List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="file" />
                  <List.Content>
                    <List.Header>
                      <Link href="/account">Account</Link>
                    </List.Header>
                    <List.Description>
                      A dashboard for each user
                    </List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="file" />
                  <List.Content>
                    <List.Header>
                      <Link href="/sequences">Sequences</Link>
                    </List.Header>
                    <List.Description>
                      RUN dataset in a table view
                    </List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="folder" />
                  <List.Content>
                    <List.Header>
                      <Link href="/isolate">Isolate</Link>
                    </List.Header>
                    <List.Description>Isolate</List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/isolate/ssa">
                              Single Sample Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            Single Sample Analysis for Isolate
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/isolate/da">Dataset Analysis</Link>
                          </List.Header>
                          <List.Description>
                            Dataset Analysis for Isolate
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="folder" />
                  <List.Content>
                    <List.Header>
                      <Link href="/metagenome">Metagenome</Link>
                    </List.Header>
                    <List.Description>Metagenome</List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/metagenome/ssa">
                              Single Sample Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            Single Sample Analysis for Metagenome
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/metagenome/da">Dataset Analysis</Link>
                          </List.Header>
                          <List.Description>
                            Dataset Analysis for Metagenome
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default withAuth(Home);
