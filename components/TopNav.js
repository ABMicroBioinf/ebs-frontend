import { Icon, Input, Menu } from "semantic-ui-react";

export default function TopNav() {

    const handleSignInClick = e => {
    }

    return (
        <Menu secondary className='ebs-top-navbar-shadow'>
            <Menu.Item
                name='Branding'
                link
                href='/'
            >
                <Icon name='dna' />
                EBS
            </Menu.Item>
            <Menu.Item
                name='Workspaces'
                link
                href='/workspaces'
            />
            <Menu.Item
                name='Published'
                link
                href='/published'
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item 
                    name='Github'
                    link 
                    href='https://github.com/ABMicroBioinf'
                >
                    <Icon name='github' />
                    Github
                </Menu.Item>
                <Menu.Item
                    name='SignIn'
                    onClick={handleSignInClick}
                />
            </Menu.Menu>
        </Menu>
    )
}