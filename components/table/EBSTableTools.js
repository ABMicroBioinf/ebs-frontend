/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useCallback, useState } from "react";
import {
  Menu,
  Segment,
  Pagination,
  Button,
  Dropdown,
  Item,
  Input,
  Checkbox,
  Grid,
} from "semantic-ui-react";

/**
 * Column Selector
 */
function ColumnSelector(props) {
  const { columnData, setRowData } = props;

  const handleCheck = useCallback((e) => {
    setRowData({
      type: "SET_HISTORY",
      module: "columns",
      column: e.currentTarget.value,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  const handleBlur = useCallback((e) => {
    if (e && e.relatedTarget === null) {
      // setToggleParent(false)
      // console.log('relatedtarget exist')
    }
  }, []);

  return (
    <Grid columns={5}>
      {columnData &&
        columnData.map((column, index) => (
          // <Item key={index} disabled={column.primary}>
          //   <input
          //     onChange={handleCheck}
          //     onBlur={handleBlur}
          //     value={column.name}
          //     defaultChecked={column.display}
          //     type="checkbox"
          //   />
          //   <label>{column.name}</label>
          // </Item>
          <Grid.Column key={index}>
            <input
              disabled={column.primary}
              label={column.name}
              value={column.name}
              onChange={handleCheck}
              onBlur={handleBlur}
              defaultChecked={column.display}
              type="checkbox"
            />
            <label>{column.name}</label>
          </Grid.Column>
        ))}
    </Grid>
  );
}

export default function EBSTableTools(props) {
  const { columnData, rowData, setRowData } = props;
  const { ORIGIN, history, dataset } = rowData;
  const { pagination } = history;
  const { page, pageSize, pageCount } = pagination;

  const [activeItem, setActiveItem] = useState("");

  const pageSizeOptions = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "50", value: 50 },
    { key: 5, text: "100", value: 100 },
  ];

  const handleItemClick = useCallback((e, { name }) => {
    setActiveItem(name);
  }, []);

  const handlePageChange = useCallback((e, data) => {
    setRowData({
      type: "SET_HISTORY",
      page: data.activePage,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  const handlePageSizeChange = useCallback((e, data) => {
    setRowData({
      type: "SET_HISTORY",
      page: 1,
      pageSize: data.value,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  }, []);

  const handleSubmenuClose = useCallback((e) => {
    e.preventDefault();
    setActiveItem("");
  }, []);

  const pageSubmenu = (
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

  const columnsSubmenu = (
    <ColumnSelector
      columnData={columnData}
      rowData={rowData}
      setRowData={setRowData}
    />
  );

  const getSubmenu = useCallback(() => {
    switch (activeItem) {
      case "page":
        return pageSubmenu;

      case "columns":
        return columnsSubmenu;

      default:
        return null;
    }
  }, [activeItem]);

  return (
    <>
      <Menu attached="top" tabular fluid>
        <Menu.Item>
          <Pagination
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
    </>
  );
}
