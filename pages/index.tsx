/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 09:31:16
 * @modify date 2021-07-15 15:08:13
 * @desc [description]
 */
import React from "react";
import Link from "next/link";
import TopNav from "../components/global/TopNav";
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
 * The main page of application.
 * @returns {React.ReactElement} - Main layout of Home
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
                      <Link href="/analysis/cpo">CPO-Analysis</Link>
                    </List.Header>
                    <List.Description></List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/cpo/ssa">
                              Single Sample Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            CPO Single Sample Analysis
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/cpo/da">
                              Dataset Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            CPO Dataset Analysis
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
                      <Link href="/analysis/metagenome">
                        Metagenome-Analysis
                      </Link>
                    </List.Header>
                    <List.Description></List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/metagenome/ssa">
                              Single Sample Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            Metagenome Single Sample Analysis
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/metagenome/da">
                              Dataset Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            Metagenome Dataset Analysis
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
                      <Link href="/analysis/tb">TB-Analysis</Link>
                    </List.Header>
                    <List.Description></List.Description>
                    <List.List>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/tb/ssa">
                              Single Sample Analysis
                            </Link>
                          </List.Header>
                          <List.Description>
                            TB Single Sample Analysis
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file" />
                        <List.Content>
                          <List.Header>
                            <Link href="/analysis/tb/da">Dataset Analysis</Link>
                          </List.Header>
                          <List.Description>
                            TB Dataset Analysis
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
