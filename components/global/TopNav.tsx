/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 11:32:53
 * @modify date 2021-07-15 11:33:01
 * @desc [description]
 */
import { useAuth } from "../../middleware/AuthProvider";

import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

/**
 * TopNav
 * @returns - Top Navigation Bar Component
 */
function TopNav(): JSX.Element {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const goLink = (e, data) => {
    console.log(data.to);
    router.push(data.to);
  };

  const ebs_menu = [
    {
      key: 1,
      text: "Seqs",
      as: "button",
      to: "/sequences",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: true,
      value: 1,
    },
    {
      key: 2,
      text: "Analysis",
      as: "button",
      to: "/analysis",
      handler: goLink,
      depth: 1,
      has_children: true,
      parent: 0,
      need_account: true,
      value: 2,
    },
    {
      key: 3,
      text: "Chart Examples",
      as: "button",
      to: "/test",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: true,
      value: 3,
    },
    {
      key: 4,
      text: "CPO-Analysis",
      as: "button",
      to: "/analysis/cpo",
      handler: goLink,
      depth: 2,
      has_children: false,
      parent: 2,
      need_account: true,
      value: 4,
    },
    {
      key: 5,
      text: "Metagemnome-Analysis",
      as: "button",
      to: "/analysis/metagenome",
      handler: goLink,
      depth: 2,
      has_children: false,
      parent: 2,
      need_account: true,
      value: 5,
    },
    {
      key: 6,
      text: "TB-Analysis",
      as: "button",
      to: "/analysis/tb",
      handler: goLink,
      depth: 2,
      has_children: false,
      parent: 2,
      need_account: true,
      value: 6,
    },
  ];

  const basic_menu = [
    {
      key: 1,
      text: "Github",
      as: "link",
      to: "https://github.com/ABMicroBioinf",
      handler: null,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: false,
      value: 1,
    },
    {
      key: 2,
      text: "Login",
      as: "button",
      to: "/login",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: false,
      value: 2,
    },
    {
      key: 3,
      text: "Register",
      as: "button",
      to: "/register",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: false,
      value: 3,
    },
    {
      key: 4,
      text: "Account",
      as: "button",
      to: "/account",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: true,
      value: 4,
    },
    {
      key: 5,
      text: "Logout",
      as: "button",
      to: "/logout",
      handler: goLink,
      depth: 1,
      has_children: false,
      parent: 0,
      need_account: true,
      value: 5,
    },
  ];

  return (
    <Menu
      fixed="top"
      color="blue"
      inverted
      secondary
      className="ebs-top-navbar"
    >
      <Menu.Item name="Branding" href="/" onClick={goLink}>
        <Icon name="dna" />
        EBS
      </Menu.Item>
      {isAuthenticated &&
        ebs_menu.map((menu) => {
          if (menu.depth == 1 && !menu.has_children) {
            if (menu.as === "link") {
              return (
                <Menu.Item
                  link
                  key={menu.key}
                  name={menu.text}
                  href={menu.to}
                />
              );
            } else if (menu.as === "button") {
              return (
                <Menu.Item
                  key={menu.key}
                  name={menu.text}
                  to={menu.to}
                  onClick={menu.handler && menu.handler}
                />
              );
            }
          } else if (menu.depth == 1 && menu.has_children) {
            return (
              <Menu.Item key={menu.key}>
                <Dropdown text={menu.text}>
                  <Dropdown.Menu>
                    {ebs_menu
                      .filter((child) => child.parent === menu.value)
                      .map((child) => {
                        if (child.as === "link") {
                          return (
                            <Dropdown.Item link key={child.key} href={child.to}>
                              {child.text}
                            </Dropdown.Item>
                          );
                        } else if (child.as === "button") {
                          return (
                            <Dropdown.Item
                              key={child.key}
                              to={child.to}
                              onClick={child.handler && child.handler}
                            >
                              {child.text}
                            </Dropdown.Item>
                          );
                        }
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            );
          }
        })}
      <Menu.Menu position="right">
        {basic_menu.map((menu) => {
          if (menu.depth == 1 && !menu.has_children) {
            if (menu.as === "link") {
              // return <Menu.Item
              //     link
              //     key={menu.key}
              //     name={menu.text}
              //     href={menu.to}
              // />
              return menu.need_account ? (
                isAuthenticated ? (
                  <Menu.Item
                    link
                    key={menu.key}
                    name={menu.text}
                    href={menu.to}
                  />
                ) : null
              ) : isAuthenticated ? null : (
                <Menu.Item
                  link
                  key={menu.key}
                  name={menu.text}
                  href={menu.to}
                />
              );
            } else if (menu.as === "button") {
              return menu.need_account ? (
                isAuthenticated ? (
                  <Menu.Item
                    key={menu.key}
                    name={menu.text}
                    to={menu.to}
                    onClick={menu.handler && menu.handler}
                  />
                ) : null
              ) : isAuthenticated ? null : (
                <Menu.Item
                  key={menu.key}
                  name={menu.text}
                  to={menu.to}
                  onClick={menu.handler && menu.handler}
                />
              );
            }
          } else if (menu.depth == 1 && menu.has_children) {
            return (
              <Menu.Item key={menu.key}>
                <Dropdown text={menu.text}>
                  <Dropdown.Menu>
                    {basic_menu
                      .filter((child) => child.parent === menu.value)
                      .map((child) => {
                        if (child.as === "link") {
                          // return <Dropdown.Item
                          //     link
                          //     key={child.key}
                          //     href={child.to}
                          // >
                          //     {child.text}
                          // </Dropdown.Item>
                          return child.need_account ? (
                            isAuthenticated ? (
                              <Dropdown.Item
                                link
                                key={child.key}
                                href={child.to}
                              >
                                {child.text}
                              </Dropdown.Item>
                            ) : null
                          ) : isAuthenticated ? null : (
                            <Dropdown.Item link key={child.key} href={child.to}>
                              {child.text}
                            </Dropdown.Item>
                          );
                        } else if (child.as === "button") {
                          // return <Dropdown.Item
                          //     key={child.key}
                          //     to={child.to}
                          //     onClick={child.handler && child.handler}
                          // >
                          //     {child.text}
                          // </Dropdown.Item>
                          return child.need_account ? (
                            isAuthenticated ? (
                              <Dropdown.Item
                                key={child.key}
                                to={child.to}
                                onClick={child.handler && child.handler}
                              >
                                {child.text}
                              </Dropdown.Item>
                            ) : null
                          ) : isAuthenticated ? null : (
                            <Dropdown.Item
                              key={child.key}
                              to={child.to}
                              onClick={child.handler && child.handler}
                            >
                              {child.text}
                            </Dropdown.Item>
                          );
                        }
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            );
          }
        })}
      </Menu.Menu>
    </Menu>
  );
}

export default TopNav;
