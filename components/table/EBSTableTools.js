/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useCallback, useState } from "react";
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

/**
 * Column Selector
 */
function ColumnSelector(props) {
  const { columnData, setRowData } = props;

  const handleChange = useCallback((e) => {
    setRowData({
      type: "SET_HISTORY",
      module: "columns",
      column: e.currentTarget.value,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  return (
    <Grid columns={5}>
      {columnData &&
        columnData.map((column, index) => (
          <Grid.Column key={index}>
            <input
              disabled={column.primary}
              label={column.value}
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
 * Page Selector
 */
function PageSizeSelector(props) {
  const { pageSize, setRowData } = props;

  const pageSizeOptions = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "50", value: 50 },
    { key: 5, text: "100", value: 100 },
  ];

  const handlePageSizeChange = useCallback(
    (e, data) => {
      setRowData({
        type: "SET_HISTORY",
        page: 1,
        pageSize: data.value,
      });
      setRowData({
        type: "APPLY_HISTORY",
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

export default function EBSTableTools(props) {
  const { tableTitle, columnData, rowData, setRowData } = props;
  const { ORIGIN, history, dataset } = rowData;
  const { pagination } = history;
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
      setRowData({
        type: "SET_HISTORY",
        page: data.activePage,
      });
      setRowData({
        type: "APPLY_HISTORY",
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
    setRowData({
      type: "RESET_DATASET",
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  const getSubmenu = useCallback(() => {
    switch (activeItem) {
      case "page":
        return <PageSizeSelector pageSize={pageSize} setRowData={setRowData} />;

      case "columns":
        return (
          <ColumnSelector
            columnData={columnData}
            rowData={rowData}
            setRowData={setRowData}
          />
        );

      default:
        return null;
    }
  }, [activeItem, pageSize, columnData, rowData]);

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
                  (dataset.length > 0 ? 1 : 0)
                ).toString() +
                " - " +
                (Number(pageSize) > dataset.length
                  ? ORIGIN.length
                  : Number(page) * Number(pageSize)
                ).toString() +
                " of " +
                ORIGIN.length
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
                      {ORIGIN.filter((obj) => obj.isSelected).length}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{`${tableTitle}.csv`}</Table.Cell>
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
              ORIGIN.filter((obj) => obj.isSelected).length > 0
                ? ""
                : "disabled"
            }`}
          >
            <CSVLink
              data={ORIGIN.filter((obj) => obj.isSelected).map(
                (obj) => obj.data
              )}
              filename={`${tableTitle}.csv`}
            >
              Export
            </CSVLink>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
}
