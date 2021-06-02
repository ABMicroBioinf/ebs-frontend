import { Grid } from "semantic-ui-react"
import TopNav from "../../../components/TopNav"
import OpenAnalysis from "../../components/OpenAnalysis"
import WorkspaceMenu from "../../components/WorkspaceMenu"
import { useEffect, useState } from "react"
import axios from "axios"
import AddSequence from "../../components/AddSequence"

export default function Workspaces() {

    const [refresh, setRefresh] = useState(false)
    const [activeWork, setActiveWork] = useState('Analysis')
    const [analyses, setAnalyses] = useState()
    const [sequences, setSequences] = useState()

    const getWorkPane = () => {
        if(activeWork === 'Analysis') {
            return  <OpenAnalysis sequences={sequences} />
        } else if (activeWork === 'Sequence') {
            return <AddSequence setRefresh={setRefresh} />
        } else {
            return <div><h3>No work pane is available</h3></div>
        }
    }

    const fetchAnalyses = () => {
        let url = 'http://localhost:8000/ebs/analysis/all'
        let config = {
            headers: {
                'Content-Type': 'text/html',
            }
        }

        axios.get(
            url,
            config
        ).then(res => {
            setAnalyses(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchSequences = () => {
        let url = 'http://localhost:8000/ebs/sequence/all'
        let config = {
            headers: {
                'Content-Type': 'text/html',
            }
        }

        axios.get(
            url,
            config
        ).then(res => {
            setSequences(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchAnalyses()
        fetchSequences()
    }, [refresh])

    return (
        <>
            <TopNav />
            <Grid divided='vertically' padded='horizontally' celled='internally' className='ebs-workspaces-grid-full-height'>
                <Grid.Row columns={2} stretched>
                    <Grid.Column width={6}>
                        <Grid.Row stretched style={{ height: '5%' }}>
                            My Workspace
                        </Grid.Row>
                        <Grid.Row stretched style={{ height: '95%' }}>
                            <WorkspaceMenu 
                                activeWork={activeWork} 
                                analyses={analyses}
                                sequences={sequences}
                                setActiveWork={setActiveWork} 
                            />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {activeWork && getWorkPane()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}