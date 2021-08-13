/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-27 12:15:22
 * @modify date 2021-07-27 12:15:22
 * @desc [description]
 */

import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

function TablePlaceholder(): JSX.Element {
  return (
    <>
      <Segment className="ebs-loader">
        <Dimmer active inverted>
          <Loader inverted>Preparing Data</Loader>
        </Dimmer>
      </Segment>
    </>
  );
}

export default TablePlaceholder;
