/**
 * Author: Jongil Yoon
 */

import axios from "axios";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button, Form, Grid, Icon, Input, Segment } from "semantic-ui-react";
import TopNav from "../components/TopNav";


export default function Register() {

    const router = useRouter()

    const register = useCallback((e) => {
        e.preventDefault()
        const url = '/api/register'
        const form_data = new FormData()
        form_data.append('email', e.target.elements.email.value)
        form_data.append('username', e.target.elements.username.value)
        form_data.append('password', e.target.elements.password.value)

        axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: url,
            data: form_data
        }).then(res => {
            console.log(res.status)
            if (res.status === 200) {
                router.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <TopNav />
            <Grid className="middle aligned ebs-full-height" centered>
                <Grid.Column className="ebs-login" textAlign="center">
                    <Segment className="middle alignedt">
                        <Icon name="dna" size="huge" />
                        <h2>EBS Sign Up</h2>
                        <Form onSubmit={register}>
                            <Form.Field>
                                <Input name="email" type="email" icon="mail" iconPosition="left" placeholder="E-mail address" required />
                            </Form.Field>
                            <Form.Field>
                                <Input name="username" type="text" icon="user" iconPosition="left" placeholder="Username" required />
                            </Form.Field>
                            <Form.Field>
                                <Input name="password" type="password" icon="lock" iconPosition="left" placeholder="Password" required />
                            </Form.Field>
                            <Form.Field>
                                <Input name="repeat" type="password" icon="check" iconPosition="left" placeholder="Repeat password" required />
                            </Form.Field>
                            <Button primary fluid type="submit">Sign Up</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}