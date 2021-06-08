/**
 * Author: Jongil Yoon
 */

import { Container, Form, Grid, Input, Segment } from "semantic-ui-react";
import TopNav from "../components/TopNav";


export default function Account() {

    return (
        <>
            <TopNav />
            <Container>
                <Grid className="middle aligned ebs-full-height">
                    <Grid.Column>
                        <Segment vertical padded className="middle aligned">
                            <h1>Account Settings</h1>
                        </Segment>
                        <Segment vertical padded className="ebs-account-segment-spacing middle aligned">
                            <h2>Username</h2>
                            <Form>
                                <Form.Field width={5}>
                                    <Input name="username" type="text" icon="user" iconPosition="left" placeholder="Username" required />
                                </Form.Field>
                                <Form.Field width={5}>
                                    <Input name="repeat" type="text" icon="check" iconPosition="left" placeholder="Confirm Username" required />
                                </Form.Field>
                                <Form.Button color="green" content="Change username" />
                            </Form>
                        </Segment>
                        <Segment vertical padded className="ebs-account-segment-spacing middle aligned">
                            <h2>Password</h2>
                            <Form>
                                <Form.Field width={5}>
                                    <Input name="password" type="password" icon="lock" iconPosition="left" placeholder="Password" required />
                                </Form.Field>
                                <Form.Field width={5}>
                                    <Input name="repeat" type="password" icon="check" iconPosition="left" placeholder="Confirm Password" required />
                                </Form.Field>
                                <Form.Button color="green" content="Change Password" />
                            </Form>
                        </Segment>
                        <Segment vertical padded className="ebs-account-segment-spacing middle aligned">
                            <h2>Danger</h2>
                            <Form.Button color="red" content="Delete Account" />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>

            {/* <Modal
                size="mini"
                open={open}
                onClose={() => dispatch({ type: 'close' })}
            >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => dispatch({ type: 'close' })}>
                        No
                    </Button>
                    <Button positive onClick={() => dispatch({ type: 'close' })}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal> */}
        </>
    )

}