/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import Link from "next/link";
import { useCallback } from "react";
import { useAuth } from "../middleware/AuthProvider";
import withoutAuth from "../middleware/withoutAuth";

import TopNav from "../components/TopNav";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";

function Login() {
  const { setAuthenticated } = useAuth();

  const login = useCallback(async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
    };

    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    const res = await axios.post(
      "http://localhost:8000/api/account/login",
      data,
      config
    );

    if (res.status === 200) {
      setAuthenticated(true);
    } else {
      console.err("login error", res);
    }
  }, []);

  return (
    <>
      <TopNav />
      <Grid className="middle aligned ebs-full-height" centered>
        <Grid.Column className="ebs-login" textAlign="center">
          <Segment className="middle alignedt">
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
    </>
  );
}

export default withoutAuth(Login);
