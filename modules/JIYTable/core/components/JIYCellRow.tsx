/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:15
 * @modify date 2021-07-15 13:27:22
 * @desc [description]
 */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Header, Modal, Table, TableBody } from "semantic-ui-react";
import { pick } from "../libs/gizmos";
import { JIYCellRowContext } from "../models/JIYContexts";
import JIYCellHeading from "./JIYCellHeading";
import hash from "object-hash";
import TablePlaceholder from "../../../../components/global/TablePlaceholder";

/**
 * JIYCellRow
 * @param param0 - See {@link JIYCellRowContext}
 * @returns - Cell Row Component
 */
function JIYCellRow<T>({
  primaryField,
  path,
  invertSelection,
  excludedItems,
  headers,
  records,
  record,
  index,
  setRecords,
  setInvertSelection,
  setExcludedItems,
}: JIYCellRowContext<T>): JSX.Element {
  const [row, setRow] = useState(record.data);
  const [detailView, setDetailView] = useState(false);
  const [innerData, setInnerData] = useState([]);

  const handleDetailView = (e) => {
    setDetailView(!detailView);
  };

  const getValue = (key, value) => {
    if (primaryField.value === key) {
      return <Link href={`${path}/${value}`}>{value}</Link>;
    }
    if (Array.isArray(value)) {
      return <Button onClick={handleDetailView}>{"See Details"}</Button>;
    }
    return value;
  };

  useEffect(() => {
    const keys = headers.filter((colState) => colState.display === "visible");
    setRow(pick(record.data, keys));
  }, [headers]);

  useEffect(() => {
    const data = Object.values(row).find((value) => Array.isArray(value));
    data && setInnerData(data);
  }, []);

  return (
    <>
      <Table.Row>
        <Table.Cell>
          <JIYCellHeading
            invertSelection={invertSelection}
            excludedItems={excludedItems}
            record={record}
            records={records}
            index={index}
            setRecords={setRecords}
            setInvertSelection={setInvertSelection}
            setExcludedItems={setExcludedItems}
          />
        </Table.Cell>
        {row &&
          Object.entries(row).map(([key, value], index) => (
            <Table.Cell key={index}>{getValue(key, value)}</Table.Cell>
          ))}
      </Table.Row>

      <Modal
        onClose={() => setDetailView(false)}
        onOpen={() => setDetailView(true)}
        open={detailView}
        size="large"
      >
        <Modal.Header>Detail View</Modal.Header>
        {innerData.length > 0 ? (
          <>
            <Modal.Content>
              <Modal.Description>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      {Object.keys(innerData[0]).map((key, index) => (
                        <Table.HeaderCell singleLine key={index}>
                          {key}
                        </Table.HeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <TableBody>
                    {/* {innerData.map((data) => <Table.Cell>{data}</Table.Cell>)} */}
                    {innerData.map((data, index) => (
                      <Table.Row key={index}>
                        {Object.values(data).map((value, i) => (
                          <Table.Cell key={i}>{value}</Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </TableBody>
                </Table>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setDetailView(false)}>
                Close
              </Button>
            </Modal.Actions>
          </>
        ) : (
          <TablePlaceholder />
        )}
      </Modal>
    </>
  );
}

export default JIYCellRow;
