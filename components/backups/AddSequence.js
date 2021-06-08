/**
 * Author: Jongil Yoon
 */

import axios from "axios"
import { useState } from "react"
import { Button, Form, Input, Menu, Segment } from "semantic-ui-react"


export default function AddSequence({ setRefresh }) {

    const [activeItem, setActiveItem] = useState('Upload')
    const [fileListObj, setFileListObj] = useState()

    const getItemSegment = () => {
        if (activeItem === 'Upload') {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Choose Sequence Files</label>
                        <input type="file" name="files" onChange={handleFilesChange} multiple />
                    </Form.Field>
                    <Button type='submit' primary>Upload</Button>
                </Form>
            )
        } else if (activeItem === 'Detail') {
            return (
                <>
                </>
            )
        } else {
            return <div><h3>No item segment is available</h3></div>
        }
    }

    const handleItemChange = (e, { name }) => {
        setActiveItem(name)
    }

    const handleFilesChange = e => {
        setFileListObj(e.target.files)
    }

    const handleSubmit = e => {
        let url = 'http://localhost:8000/ebs/sequence/add'
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        let form_data = new FormData()

        if (fileListObj) {
            let fileList = [...fileListObj]
            fileList.forEach(file => {
                form_data.append('files', file)
            })
        }

        axios.post(
            url,
            form_data,
            config
        ).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(
            setRefresh(true)
        )
    }

    return (
        <div>
            <Menu attached='top' tabular>
                <Menu.Item
                    name='Upload'
                    active={activeItem === 'Upload'}
                    onClick={handleItemChange}
                />
                <Menu.Item
                    name='Detail'
                    active={activeItem === 'Detail'}
                    onClick={handleItemChange}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input
                            transparent
                            icon={{ name: 'search', link: true }}
                            placeholder='Search sequence...'
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            {/* Temporary style */}
            <Segment attached='bottom' style={{ height: '90%' }}>
                {activeItem && getItemSegment()}
            </Segment>
        </div>
    )
}