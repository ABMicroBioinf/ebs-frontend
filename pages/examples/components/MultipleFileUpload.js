/**
 * Author: Jongil Yoon
 */

import axios from 'axios'
import { useState } from 'react'
import { Button, Card, CardContent, Form } from 'semantic-ui-react'


export default function MultipleFileUpload() {

    const [fileListObj, setFileListObj] = useState()

    const handleChange = e => {
        setFileListObj(e.target.files)
    }

    const handleSubmit = e => {
        let url = 'http://localhost:8000/examples/multiple-files-upload'
        let config = { 
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        }
        let form_data = new FormData()

        let fileList = [...fileListObj]
        fileList.forEach(file => {
            form_data.append('files', file)
        })

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
        <Card centered>
            <CardContent>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Select Files</label>
                        <input type="file" name="files" onChange={handleChange} multiple />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </CardContent>
        </Card>
    )

}