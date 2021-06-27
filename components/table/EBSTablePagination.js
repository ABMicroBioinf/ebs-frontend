/**
 * Author: Jongil Yoon
 */

import { Dropdown, Grid, Menu, Pagination } from "semantic-ui-react";

const pageSizeOptions = [
  { key: 1, text: "5", value: 5 },
  { key: 2, text: "10", value: 10 },
  { key: 3, text: "20", value: 20 },
  { key: 4, text: "50", value: 50 },
  { key: 5, text: "100", value: 100 },
];

export default function EBSTablePagination(props) {
  const { rowData, setRowData } = props;
  const { history } = rowData;
  const { pagination } = history;
  const { pageSize, pageCount } = pagination;

  const handlePageChange = (e, data) => {
    setRowData({
      type: "SET_HISTORY",
      page: data.activePage,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  };

  const handlePageSizeChange = (e, data) => {
    setRowData({
      type: "SET_HISTORY",
      page: 1,
      pageSize: data.value,
    });
    setRowData({
      type: "APPLY_HISTORY",
    });
  };

  return (
    <Grid padded columns="equal">
      <Grid.Column floated="left">
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
      </Grid.Column>
      <Grid.Column
        floated="right"
        textAlign="right"
        className="ebs-pagination-temporary"
      >
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
      </Grid.Column>
    </Grid>
  );
}
