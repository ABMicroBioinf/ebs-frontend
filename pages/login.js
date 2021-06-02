import { Button, Form, Grid, Icon, Input, Message, Segment } from "semantic-ui-react";
import TopNav from "../components/TopNav";

export default function Login() {

    return (
        <>
            <TopNav />
            <Grid className="middle aligned ebs-full-height" centered>
                <Grid.Column className="ebs-login" textAlign="center">
                    <Segment className="middle alignedt">
                        <Icon name="dna" size="huge" />
                        <h2>EBS Login</h2>
                        <Form>
                            <Form.Field>
                                <Input name="email" type="email" icon="mail" iconPosition="left" placeholder="E-mail address" required />
                            </Form.Field>
                            <Form.Field>
                                <Input name="password" type="password" icon="lock" iconPosition="left" placeholder="Password" required />
                            </Form.Field>
                            <Button primary fluid type="submit">Login</Button>
                        </Form>
                        <Message>
                            Don't you have an account?
                            <a href="/register"> Sign Up</a>
                        </Message>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )

}