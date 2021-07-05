/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useAuth } from "../middleware/AuthProvider";
import withoutAuth from "../middleware/withoutAuth";
import { useRouter } from "next/router";

import TopNav from "../components/TopNav";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Segment,
  Modal,
  Header,
} from "semantic-ui-react";

function Login() {
  const router = useRouter();

  const { setAuthenticated } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);

  const login = useCallback(async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
    };

    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    await axios
      .post("http://localhost:8000/api/account/login", data, config)
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
          router.push("/");
        } else {
          setOpenAlert(true);
        }
      })
      .catch(() => {
        setOpenAlert(true);
      });
  }, []);

  return (
    <>
      <TopNav />
      <Grid centered padded>
        <Grid.Column className="ebs-login-form-wrapper" textAlign="center">
          <Segment className="middle aligned">
            <Icon name="dna" size="huge" />
            <h2>EBS Login</h2>
            <Form onSubmit={login}>
              <Form.Field>
                <Input
                  name="email"
                  type="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  required
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  required
                />
              </Form.Field>
              <Button primary fluid type="submit">
                Login
              </Button>
            </Form>
            <Message>
              Don&apos;t you have an account?
              <Link href="/register"> Sign Up</Link>
            </Message>
          </Segment>
        </Grid.Column>
      </Grid>

      <Modal
        basic
        onClose={() => setOpenAlert(false)}
        onOpen={() => setOpenAlert(true)}
        open={openAlert}
        size="small"
        dimmer="blurring"
      >
        <Header icon>
          <Icon name="lock" />
          Login Failed
        </Header>
        <Modal.Content>
          <Grid>
            <Grid.Column textAlign="center">
              <p>Please try again</p>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Column textAlign="center">
              <Button
                color="green"
                inverted
                onClick={() => setOpenAlert(false)}
              >
                <Icon name="checkmark" /> Confirm
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default withoutAuth(Login);
