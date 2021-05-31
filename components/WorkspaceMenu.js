import { Grid, Icon, List, Menu } from "semantic-ui-react";

export default function WorkspaceMenu({ activeWork, analyses, sequences, setActiveWork }) {

    const handleWorkClick = (e, { name }) => {
        setActiveWork(name)
    }

    const getWorkList = () => {
        if (activeWork === 'Analysis') {
            console.log(analyses)
            return analyses && analyses.map(ana => <List.Item key={ana.id}>{ana.name}</List.Item>)
        } else if (activeWork === 'Sequence') {
            return sequences && sequences.map(seq => <List.Item key={seq.id}>{seq.seqfile_path}</List.Item>)
        } else {
            return <List.Item>no data</List.Item>
        }
    }

    return (
        <Grid divided='vertically' celled='internally' style={{ height: '100%' }}>
            <Grid.Row columns={2} stretched>
                <Grid.Column width={5}>
                    <Menu icon='labeled' vertical className='ebs-workspaces-toolbar-borderless'>
                        <Menu.Item
                            name='Analysis'
                            active={activeWork === 'Analysis'}
                            onClick={handleWorkClick}
                        >
                            <Icon name='cogs' />
                            Analysis
                        </Menu.Item>

                        <Menu.Item
                            name='Sequence'
                            active={activeWork === 'Sequence'}
                            onClick={handleWorkClick}
                        >
                            <Icon name='dna' />
                            Sequence
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column width={11}>
                    <List>
                        <List.Item><h4>{activeWork}</h4></List.Item>
                        <List.Item>
                            <List.List>
                                {activeWork && getWorkList()}
                            </List.List>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}