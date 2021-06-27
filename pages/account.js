/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import withAuth from "../middleware/withAuth";
import { useAuth } from "../middleware/AuthProvider";

import TopNav from "../components/TopNav";
import {
  Container,
  Form,
  Grid,
  Input,
  Modal,
  Segment,
  Button,
} from "semantic-ui-react";

function Account() {
  const router = useRouter();

  const { accessToken } = useAuth();

  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [shouldAlert, setShouldAlert] = useState(false);

  const handlePasswordChange = useCallback(() => {}, []);
  const handleRepeatChange = useCallback(() => {}, []);
  const submitPassword = useCallback(() => {}, []);

  const handleAccountDeleteClick = useCallback(() => {
    setShouldAlert(true);
  }, []);

  const submitAccountDelete = useCallback(async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        withCredentials: true,
      },
    };

    await axios
      .delete("http://localhost:8000/api/account/delete", config)
      .then((res) => {
        if (res === 200) {
          router.push("/logout");
        }
      })
      .catch((err) => console.log(err));

    setShouldAlert(false);
  }, []);

  return (
    <>
      <TopNav />
      <Grid>
        {
          <Container>
            <Grid className="middle aligned ebs-full-height">
              <Grid.Column>
                <Segment vertical padded className="middle aligned">
                  <h1>Account Settings</h1>
                </Segment>
                <Segment
                  vertical
                  padded
                  className="ebs-account-segment-spacing middle aligned"
                >
                  <h2>Password</h2>
                  <Form onSubmit={handlePasswordChange}>
                    <Form.Field width={5}>
                      <Input
                        name="password"
                        type="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        required
                      />
                    </Form.Field>
                    <Form.Field width={5}>
                      <Input
                        name="repeat"
                        type="password"
                        icon="check"
                        iconPosition="left"
                        placeholder="Confirm Password"
                        required
                      />
                    </Form.Field>
                    <Form.Button color="green" content="Change Password" />
                  </Form>
                </Segment>
                <Segment
                  vertical
                  padded
                  className="ebs-account-segment-spacing middle aligned"
                >
                  <h2>Danger</h2>
                  <Form.Button
                    onClick={handleAccountDeleteClick}
                    color="red"
                    content="Delete Account"
                  />
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        }

        <Modal
          size="small"
          open={shouldAlert}
          onClose={() => setShouldAlert(false)}
        >
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Content>
            <p>This action cannot be undone.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setShouldAlert(false)}>
              No
            </Button>
            <Button positive onClick={submitAccountDelete}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid>
    </>
  );
}

export default withAuth(Account);
