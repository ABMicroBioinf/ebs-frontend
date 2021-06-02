import { Button, Form, Grid, Icon, Input, Segment } from "semantic-ui-react";
import TopNav from "../components/TopNav";

export default function Register() {

    return (
        <>
            <TopNav />
            <Grid className="middle aligned ebs-full-height" centered>
                <Grid.Column className="ebs-login" textAlign="center">
                    <Segment className="middle alignedt">
                        <Icon name="dna" size="huge" />
                        <h2>EBS Sign Up</h2>
                        <Form>
                            <Form.Field>
                                <Input name="email" type="email" icon="mail" iconPosition="left" placeholder="E-mail address" required/>
                            </Form.Field>
                            <Form.Field>
                                <Input name="username" type="text" icon="user" iconPosition="left" placeholder="Username" required/>
                            </Form.Field>
                            <Form.Field>
                                <Input name="password" type="password" icon="lock" iconPosition="left" placeholder="Password" required/>
                            </Form.Field>
                            <Form.Field>
                                <Input name="repeat" type="password" icon="check" iconPosition="left" placeholder="Repeat password" required/>
                            </Form.Field>
                            <Button primary fluid type="submit">Sign Up</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}