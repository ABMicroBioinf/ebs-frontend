/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:00
 * @modify date 2021-07-15 13:27:06
 * @desc [description]
 */
import { useCallback } from "react";
import { Checkbox } from "semantic-ui-react";
import { EBSTableRecordContext } from "./interfaces/EBSContexts";

/**
 * EBSCellHeading
 * @param param - See {@link EBSTableRecordContext}
 * @returns - Cell Heading Component
 */
function EBSCellHeading({
  record,
  setEBSTableState,
}: EBSTableRecordContext): JSX.Element {
  const handleChange = useCallback(() => {
    setEBSTableState({
      type: "SELECT_RECORD",
      record: { ...record, isSelected: !record.isSelected },
    });
  }, [record]);

  return <Checkbox checked={record.isSelected} onChange={handleChange} />;
}

export default EBSCellHeading;
