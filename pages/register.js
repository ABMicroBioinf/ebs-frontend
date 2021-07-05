/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import withoutAuth from "../middleware/withoutAuth";

import TopNav from "../components/TopNav";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Segment,
  Modal,
  Header,
} from "semantic-ui-react";

function Register() {
  const router = useRouter();

  const [openAlert, setOpenAlert] = useState(false);

  const register = useCallback(async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("email", e.target.elements.email.value);
    form_data.append("username", e.target.elements.username.value);
    form_data.append("password", e.target.elements.password.value);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("http://localhost:8000/api/account/register", form_data, config)
      .then((res) => {
        if (res.status === 201) {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <TopNav />
      <Grid centered padded>
        <Grid.Column className="ebs-register-form-wrapper" textAlign="center">
          <Segment className="middle aligned">
            <Icon name="dna" size="huge" />
            <h2>EBS Sign Up</h2>
            <Form onSubmit={register}>
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
                  name="username"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
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
              <Form.Field>
                <Input
                  name="repeat"
                  type="password"
                  icon="check"
                  iconPosition="left"
                  placeholder="Repeat password"
                  required
                />
              </Form.Field>
              <Button primary fluid type="submit">
                Sign Up
              </Button>
            </Form>
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
          Registration Failed
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

export default withoutAuth(Register);
