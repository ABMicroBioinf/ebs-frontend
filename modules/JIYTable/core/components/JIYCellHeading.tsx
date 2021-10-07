/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:00
 * @modify date 2021-07-15 13:27:06
 * @desc [description]
 */

import { useCallback } from "react";
import { Checkbox } from "semantic-ui-react";
import { JIYCellHeadingContext } from "../models/JIYContexts";

/**
 * JIYCellHeading
 * @param param0 - See {@link JIYCellHeadingContext}
 * @returns Cell Heading Component
 */
function JIYCellHeading<T>({
  isSelectedAll,
  selectedItems,
  record,
  records,
  index,
  setRecords,
  setSelectedAll,
  setSelectedItems,
}: JIYCellHeadingContext<T>): JSX.Element {
  const handleChange = useCallback(() => {
    if (isSelectedAll) {
      setSelectedAll(false);
      setRecords(
        records.map((record, i) => {
          if (i === index) {
            return { ...record, isSelected: false };
          } else {
            return record;
          }
        })
      );
    } else {
      setRecords(
        records.map((record, i) => {
          if (i === index) {
            return { ...record, isSelected: !record.isSelected };
          } else {
            return record;
          }
        })
      );
    }
  }, [isSelectedAll, records, record]);

  return <Checkbox checked={record.isSelected} onChange={handleChange} />;
}

export default JIYCellHeading;
