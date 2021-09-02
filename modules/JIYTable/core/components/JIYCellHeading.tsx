/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:00
 * @modify date 2021-07-15 13:27:06
 * @desc [description]
 */

import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "semantic-ui-react";
import { JIYCellHeadingContext } from "../models/JIYContexts";

/**
 * JIYCellHeading
 * @param param0 - See {@link JIYCellHeadingContext}
 * @returns Cell Heading Component
 */
function JIYCellHeading<T>({
  record,
  records,
  index,
  setRecords,
}: JIYCellHeadingContext<T>): JSX.Element {
  const [isSelected, setSelected] = useState(record.isSelected);

  const handleChange = useCallback(() => {
    setSelected(!isSelected);
  }, [isSelected]);

  useEffect(() => {
    records[index].isSelected = !isSelected;
    setRecords(records);
  }, [isSelected]);

  useEffect(() => {
    setSelected(record.isSelected);
  }, [record]);

  return <Checkbox checked={isSelected} onChange={handleChange} />;
}

export default JIYCellHeading;
