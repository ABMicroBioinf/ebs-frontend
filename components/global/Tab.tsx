/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-09 08:50:47
 * @modify date 2021-08-09 08:50:47
 * @desc [description]
 */
import { Tab } from "semantic-ui-react";

/**
 * TabMenu
 * @param param0 - panes
 * @returns - Tab Component
 */
function TabMenu({ panes }): JSX.Element {
  return <Tab panes={panes} />;
}

export default TabMenu;
