/**
 * Author: Jongil Yoon
 */

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";

import TopNav from "../components/TopNav";

export default function Login() {
  const router = useRouter();

  const login = useCallback((e) => {
    e.preventDefault();
    const url = "/api/login";
    const form_data = new FormData();
    form_data.append("email", e.target.elements.email.value);
    form_data.append("password", e.target.elements.password.value);

    axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: url,
      data: form_data,
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
