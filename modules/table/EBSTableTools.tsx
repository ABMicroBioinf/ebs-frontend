// @ts-check
/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 10:38:41
 * @modify date 2021-07-15 10:56:22
 * @desc [description]
 */
import React, { useCallback, useState } from "react";
import { CSVLink } from "react-csv";

import {
  Menu,
  Segment,
  Pagination,
  Button,
  Dropdown,
  Grid,
  Icon,
  Modal,
  Header,
  Table,
  TableBody,
} from "semantic-ui-react";
import { EBSTableInstanceStateContext } from "./interfaces/EBSContexts";

/**
 * @typedef ColumnSelectorProps
 * @prop {Array<Object>} columnData
 * @prop {(Object)=>void} setRowData
 */
/**
 * ColumnSelector that
 * @param {ColumnSelectorProps} props
 * @returns {React.ReactElement}
 */
function ColumnSelector({
  ebsTableState,
  setEBSTableState,
}: EBSTableInstanceStateContext) {
  const { headers, records } = ebsTableState;

  const handleChange = useCallback((e) => {
    setEBSTableState({
      type: "TOGGLE_HEADER",
      header: e.currentTarget.value,
    });
    // setRowData({
    //   type: "APPLY_HISTORY",
    // });
  }, []);

  return (
    <Grid columns={5}>
      {headers &&
        headers.map((column, index) => (
          <Grid.Column key={index}>
            <input
              disabled={column.primary}
              // label={column.value}
              value={column.value}
              onChange={handleChange}
              defaultChecked={column.display}
              type="checkbox"
            />
            <label>{column.value}</label>
          </Grid.Column>
        ))}
    </Grid>
  );
}

/**
 * @typedef PageSizeSelectorProps
 * @prop {Number} pageSize
 * @prop {(Object)=>void} setRowData
 */
/**
 *
 * @param {PageSizeSelectorProps} props
 * @returns
 */
function PageSizeSelector({
  ebsTableState,
  setEBSTableState,
}: EBSTableInstanceStateContext) {
  const { stateChain } = ebsTableState;
  const { pagination } = stateChain;
  const { page, pageSize, pageCount } = pagination;

  const pageSizeOptions = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "50", value: 50 },
    { key: 5, text: "100", value: 100 },
  ];

  const handlePageSizeChange = useCallback(
    (e, data) => {
      setEBSTableState({
        type: "SET_PAGESIZE",
        page: 1,
        pageSize: data.value,
      });
    },
    [pageSize]
  );

  return (
    <>
      <label>Show </label>
      <Menu compact>
        <Dropdown
          onChange={handlePageSizeChange}
          text={pageSize.toString()}
          options={pageSizeOptions}
          compact
          selection
        />
      </Menu>
      <label> rows</label>
    </>
  );
}

function EBSTableTools({
  ebsTableState,
  setEBSTableState,
}: EBSTableInstanceStateContext) {
  const { title, stateChain, headers, records, RECORDS_ORIGIN_REF } =
    ebsTableState;
  const { pagination } = stateChain;
  const { page, pageSize, pageCount } = pagination;

  const [activeItem, setActiveItem] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleExport = useCallback(() => {
    setOpenAlert(!openAlert);
  }, []);

  const handleItemClick = useCallback(
    (e, { name }) => {
      name === activeItem ? setActiveItem("") : setActiveItem(name);
    },
    [activeItem]
  );

  const handlePageChange = useCallback(
    (e, data) => {
      setEBSTableState({
        type: "SET_PAGE",
        page: data.activePage,
      });
    },
    [page]
  );

  const handleSubmenuClose = useCallback((e) => {
    e.preventDefault();
    setActiveItem("");
  }, []);

  const handleRefresh = useCallback((e) => {
    e.preventDefault();
    setEBSTableState({
      type: "RESET_DATA",
    });
  }, []);

  const getSubmenu = useCallback(() => {
    switch (activeItem) {
      case "page":
        return (
          <PageSizeSelector
            ebsTableState={ebsTableState}
            setEBSTableState={setEBSTableState}
          />
        );

      case "columns":
        return (
          <ColumnSelector
            ebsTableState={ebsTableState}
            setEBSTableState={setEBSTableState}
          />
        );

      default:
        return null;
    }
  }, [activeItem, pageSize, headers, records]);

  return (
    <>
      <Menu attached="top" tabular fluid>
        <Menu.Item>
          <Button onClick={handleExport}>Export as CSV</Button>
        </Menu.Item>
        <Menu.Item>
          <Pagination
            secondary
            totalPages={pageCount}
            onPageChange={handlePageChange}
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            {(() => {
              return (
                "Showing " +
                (
                  (Number(page) - 1) * Number(pageSize) +
                  (records.length > 0 ? 1 : 0)
                ).toString() +
                " - " +
                (Number(pageSize) > records.length
                  ? RECORDS_ORIGIN_REF.length
                  : Number(page) * Number(pageSize)
                ).toString() +
                " of " +
                RECORDS_ORIGIN_REF.length
              );
            })()}
          </Menu.Item>

          <Menu.Item>
            <Button icon basic onClick={handleRefresh}>
              <Icon name="refresh" />
            </Button>
          </Menu.Item>

          <Menu.Item
            name="page"
            active={activeItem === "page"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="columns"
            active={activeItem === "columns"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>

      <Segment hidden={activeItem === ""} attached="bottom">
        {getSubmenu()}
        <Button
          circular
          floated="right"
          size="mini"
          icon="close"
          onClick={handleSubmenuClose}
        />
      </Segment>

      <Modal
        onClose={() => setOpenAlert(false)}
        onOpen={() => setOpenAlert(true)}
        open={openAlert}
        size="small"
      >
        <Modal.Header>Export as CSV</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Selection Details</Header>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Rows selected</Table.HeaderCell>
                  <Table.HeaderCell singleLine>Filename</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <TableBody>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {
                        RECORDS_ORIGIN_REF.filter((obj) => obj.isSelected)
                          .length
                      }
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{`${title}.csv`}</Table.Cell>
                </Table.Row>
              </TableBody>
            </Table>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenAlert(false)}>
            Cancel
          </Button>
          <div
            className={`ui green button ebs-custom-csv-export ${
              RECORDS_ORIGIN_REF.filter((obj) => obj.isSelected).length > 0
                ? ""
                : "disabled"
            }`}
          >
            <CSVLink
              data={RECORDS_ORIGIN_REF.filter((obj) => obj.isSelected).map(
                (obj) => obj.data
              )}
              filename={`${title}.csv`}
            >
              Export
            </CSVLink>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default EBSTableTools;
