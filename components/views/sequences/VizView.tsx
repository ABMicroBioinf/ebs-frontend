/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:20:13
 * @modify date 2021-07-15 13:20:19
 * @desc [description]
 */

import { v4 as uuidv4 } from "uuid";
import { API_SEQUENCE } from "../../../config/apis";
import React from "react";
import JIYTableInstance from "../../../modules/JIYTable/JIYTableInstance";
import {
  RunDataHandler,
  URLHandler,
} from "../../../modules/JIYTable/core/libs/handler";

/**
 * Sequences Main View
 * @param param - See {@link EBSTableDataContext}
 * @returns - Sequence Main View Components
 */
function SequencesVizView({ module }): JSX.Element {
  return (
    <>
      <JIYTableInstance
        title={module}
        path={"/sequences"}
        url={URLHandler(API_SEQUENCE)}
        module={module}
        handler={RunDataHandler}
        key={uuidv4()}
      />
      {/* <JIYTableInstance
        title={"Run #2"}
        path={"/sequences"}
        url={URLHandler(API_SEQUENCE)}
        module={module}
        handler={RunDataHandler}
        key={uuidv4()}
      /> */}
    </>
  );
}

export default SequencesVizView;
