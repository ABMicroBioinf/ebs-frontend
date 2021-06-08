/**
 * Author: Jongil Yoon
 */

import axios from 'axios'
import { useState } from 'react'
import { Button, Dropdown, Form, Grid, Icon, Input, List, Menu, Segment, TextArea } from 'semantic-ui-react'


const options = [
    { key: 1, text: 'CPO', value: 1 },
    { key: 2, text: 'Metagenomics', value: 2 },
    { key: 3, text: 'QC', value: 3 },
    { key: 4, text: 'TB', value: 4 },
]


export default function OpenAnalysis({ sequences }) {

    const [activeItem, setActiveItem] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const getSequences = () => sequences.map(seq =>
        <List.Item key={seq.id}>
            <List.Icon name='dna' />
            <List.Content>
                {seq.seqfile_path}
            </List.Content>
        </List.Item>
    )

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleDescriptionChange = e => {
        setDescription(e.target.value)
    }

    const handleItemChange = (e, { name }) => {
        setActiveItem(name)
    }

    const handleAddAnalysis = e => {
        console.log(e)
    }

    const handleSubmit = e => {
        let url = 'http://localhost:8000/ebs/analysis/open'
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)

        axios.post(
            url,
            form_data,
            config
        ).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Menu attached='top' tabular>
                <Menu.Item
                    name={name ? name : 'Unknown'}
                    active={true}
                    // active={activeItem === name}
                    onClick={handleItemChange}
                />
                <Menu.Item link onClick={handleAddAnalysis}>
                    <Icon name='add' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input
                            transparent
                            icon={{ name: 'search', link: true }}
                            placeholder='Search analysis...'
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            {/* Temporary style */}
            <Segment attached='bottom' style={{ height: '90%' }}>
                <Grid padded>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group widths='equal'>
                                    <Menu compact>
                                        <Dropdown text='pipeline' options={options} simple item />
                                    </Menu>
                                    <Form.Field control={Input} onChange={handleNameChange} placeholder='Name' />
                                </Form.Group>
                                <Form.Field control={TextArea} onChange={handleDescriptionChange} placeholder='Description' />
                                <label>Activated Sequeces</label>
                                <List divided relaxed>
                                    <List.Item>
                                        <List.Icon name='dna' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header>Activated Sequence #1</List.Header>
                                            <List.Description as='a'>example #1</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='dna' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header>Activated Sequence #2</List.Header>
                                            <List.Description as='a'>example #2</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='dna' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header>Activated Sequence #3</List.Header>
                                            <List.Description as='a'>example #3</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                                <Button type='submit' content='OPEN' primary />
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>
                                <h4>Available Sequences</h4>
                            </Grid.Row>
                            <Grid.Row>
                                <List>
                                    {sequences && getSequences()}
                                </List>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div >
    )

}