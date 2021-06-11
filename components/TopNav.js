/**
 * Author: Jongil Yoon
 */

import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { Dropdown, Icon, Menu } from "semantic-ui-react"


export default function TopNav() {

    const router = useRouter()
    const [isLogin, setLogin] = useState(false)

    const goLink = (e, data) => {
        router.push(data.to)
    }

    const handleLogOut = useCallback((e, data) => {
        // nullify user state and redirect the user to login page (main page)
        const url = '/api/logout'
        axios.get(
            url,
        )
            .then(res => {
                if (res.status === 200) {
                    router.push(data.to)
                }
            }).catch(err => {
                console.log(err)
            })
    })

    const checkLogIn = useCallback((e) => {
        const url = '/api/verify'
        axios.get(
            url,
        )
            .then(res => {
                if (res.status === 200) {
                    setLogin(res.data.available)
                } else {
                    setLogin(false)
                }
            }).catch(err => {
                setLogin(false)
            })
    }, [])

    /**
     * link is for external URL
     * button is for internal routing or dropdown menu toggle button
     */
    const ebs_menu = [
        { key: 1, text: 'Seqs', as: 'button', to: '/sequences', handler: goLink, depth: 1, has_children: false, parent: 0, need_account: true, value: 1 },
        { key: 2, text: 'Isolate', as: 'button', to: '/isolate', handler: goLink, depth: 1, has_children: true, parent: 0, need_account: true, value: 2 },
        { key: 3, text: 'Metagenome', as: 'button', to: '/metagenome', handler: goLink, depth: 1, has_children: true, parent: 0, need_account: true, value: 3 },
        { key: 4, text: 'Single Sample Analysis', as: 'button', to: '/isolate/ssa', handler: goLink, depth: 2, has_children: false, parent: 2, need_account: true, value: 4 },
        { key: 5, text: 'Dataset Analysis', as: 'button', to: '/isolate/da', handler: goLink, depth: 2, has_children: false, parent: 2, need_account: true, value: 5 },
        { key: 6, text: 'Single Sample Analysis', as: 'button', to: '/metagenome/ssa', handler: goLink, depth: 2, has_children: false, parent: 3, need_account: true, value: 6 },
        { key: 7, text: 'Dataset Analysis', as: 'button', to: '/metagenome/da', handler: goLink, depth: 2, has_children: false, parent: 3, need_account: true, value: 7 },
    ]

    const basic_menu = [
        { key: 1, text: 'Github', as: 'link', to: 'https://github.com/ABMicroBioinf', handler: null, depth: 1, has_children: false, parent: 0, need_account: false, value: 1 },
        { key: 2, text: 'Login', as: 'button', to: '/login', handler: goLink, depth: 1, has_children: false, parent: 0, need_account: false, value: 2 },
        { key: 3, text: 'Register', as: 'button', to: '/register', handler: goLink, depth: 1, has_children: false, parent: 0, need_account: false, value: 3 },
        { key: 4, text: 'Account', as: 'button', to: '/account', handler: goLink, depth: 1, has_children: false, parent: 0, need_account: true, value: 4 },
        { key: 5, text: 'Logout', as: 'button', to: '/', handler: handleLogOut, depth: 1, has_children: false, parent: 0, need_account: true, value: 5 },
    ]

    useEffect(() => {
        checkLogIn()
    }, [])

    return (
        console.log(isLogin),
        <Menu secondary className='ebs-top-navbar-shadow'>
            <Menu.Item
                link
                name='Branding'
                href='/'
            >
                <Icon name='dna' />
                EBS
            </Menu.Item>
            {
                ebs_menu.map(menu => {
                    if (menu.depth == 1 && !menu.has_children) {
                        if (menu.as === 'link') {
                            return <Menu.Item
                                link
                                key={menu.key}
                                name={menu.text}
                                href={menu.to}
                            />
                        } else if (menu.as === 'button') {
                            return <Menu.Item
                                key={menu.key}
                                name={menu.text}
                                to={menu.to}
                                onClick={menu.handler && menu.handler}
                            />
                        }
                    } else if (menu.depth == 1 && menu.has_children) {
                        return <Menu.Item key={menu.key}>
                            <Dropdown text={menu.text}>
                                <Dropdown.Menu>
                                    {
                                        ebs_menu.filter(child => child.parent === menu.value)
                                            .map(child => {
                                                if (child.as === 'link') {
                                                    return <Dropdown.Item
                                                        link
                                                        key={child.key}
                                                        href={child.to}
                                                    >
                                                        {child.text}
                                                    </Dropdown.Item>
                                                } else if (child.as === 'button') {
                                                    return <Dropdown.Item
                                                        key={child.key}
                                                        to={child.to}
                                                        onClick={child.handler && child.handler}
                                                    >
                                                        {child.text}
                                                    </Dropdown.Item>
                                                }
                                            })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    }
                })
            }
            <Menu.Menu position='right'>
                {basic_menu.map(menu => {
                    if (menu.depth == 1 && !menu.has_children) {
                        if (menu.as === 'link') {
                            // return <Menu.Item
                            //     link
                            //     key={menu.key}
                            //     name={menu.text}
                            //     href={menu.to}
                            // />
                            return menu.need_account
                                ? isLogin
                                    ? <Menu.Item
                                        link
                                        key={menu.key}
                                        name={menu.text}
                                        href={menu.to}
                                    />
                                    : null
                                : isLogin
                                    ? null
                                    : <Menu.Item
                                        link
                                        key={menu.key}
                                        name={menu.text}
                                        href={menu.to}
                                    />
                        } else if (menu.as === 'button') {
                            return menu.need_account
                                ? isLogin
                                    ? <Menu.Item
                                        key={menu.key}
                                        name={menu.text}
                                        to={menu.to}
                                        onClick={menu.handler && menu.handler}
                                    />
                                    : null
                                : isLogin
                                    ? null
                                    : <Menu.Item
                                        key={menu.key}
                                        name={menu.text}
                                        to={menu.to}
                                        onClick={menu.handler && menu.handler}
                                    />
                        }
                    } else if (menu.depth == 1 && menu.has_children) {
                        return <Menu.Item key={menu.key}>
                            <Dropdown text={menu.text}>
                                <Dropdown.Menu>
                                    {
                                        basic_menu.filter(child => child.parent === menu.value)
                                            .map(child => {
                                                if (child.as === 'link') {
                                                    // return <Dropdown.Item
                                                    //     link
                                                    //     key={child.key}
                                                    //     href={child.to}
                                                    // >
                                                    //     {child.text}
                                                    // </Dropdown.Item>
                                                    return child.need_account
                                                        ? isLogin
                                                            ? <Dropdown.Item
                                                                link
                                                                key={child.key}
                                                                href={child.to}
                                                            >
                                                                {child.text}
                                                            </Dropdown.Item>
                                                            : null
                                                        : isLogin
                                                            ? null
                                                            : <Dropdown.Item
                                                                link
                                                                key={child.key}
                                                                href={child.to}
                                                            >
                                                                {child.text}
                                                            </Dropdown.Item>
                                                } else if (child.as === 'button') {
                                                    // return <Dropdown.Item
                                                    //     key={child.key}
                                                    //     to={child.to}
                                                    //     onClick={child.handler && child.handler}
                                                    // >
                                                    //     {child.text}
                                                    // </Dropdown.Item>
                                                    return child.need_account
                                                        ? isLogin
                                                            ? <Dropdown.Item
                                                                key={child.key}
                                                                to={child.to}
                                                                onClick={child.handler && child.handler}
                                                            >
                                                                {child.text}
                                                            </Dropdown.Item>
                                                            : null
                                                        : isLogin
                                                            ? null
                                                            : <Dropdown.Item
                                                                key={child.key}
                                                                to={child.to}
                                                                onClick={child.handler && child.handler}
                                                            >
                                                                {child.text}
                                                            </Dropdown.Item>
                                                }
                                            })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    }
                })}
            </Menu.Menu>
        </Menu >
    )
}
