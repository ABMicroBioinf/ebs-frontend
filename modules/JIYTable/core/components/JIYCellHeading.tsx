/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:00
 * @modify date 2021-07-15 13:27:06
 * @desc [description]
 */

import { useCallback } from "react";
import { Checkbox } from "semantic-ui-react";

/**
 * @param param - See {@link EBSTableRecordContext}
 * @returns - Cell Heading Component
 */
function JIYCellHeading({ record, setRecords }): JSX.Element {
  const handleChange = useCallback(() => {
    console.log("selected");
  }, [record]);

  return <Checkbox checked={record.isSelected} onChange={handleChange} />;
}

export default JIYCellHeading;
