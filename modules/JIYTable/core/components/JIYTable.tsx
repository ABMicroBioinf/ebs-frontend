/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:27:30
 * @modify date 2021-07-15 13:27:35
 * @desc [description]
 */

import React, { useCallback, useRef, useState } from "react";

import { JIYTableStateContext } from "../models/JIYContexts";
import JIYTableHeader from "./JIYTableHeader";
import JIYCellRow from "./JIYCellRow";

import { Grid, Ref, Sticky, Table } from "semantic-ui-react";
import { pick } from "../libs/gizmos";
import JIYTableTools from "./JIYTableTools";
import JIYTableCustomHead from "../plugins/JIYTableCustomHead";

/**
 * JIYTable
 * A top level table component layouts entire structure of data table
 * @param param - See {@link EBSTableInstanceStateContext}
 * @returns - Table Component
 */
function JIYTable<T>({
  title,
  path,
  prev,
  next,
  total,
  page,
  pageSize,
  query,
  search,
  ordering,
  headers,
  records,
  isLoading,
  setPage,
  setPageSize,
  setQuery,
  setSearch,
  setOrdering,
  setHeaders,
  setRecords,
  setLoading,
}: JIYTableStateContext<T>): JSX.Element {
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const draggableWrapperRef = useRef(null);

  const getCellRows = useCallback(() => {
    if (headers.length > 0) {
      if (records.length > 0) {
        const keys = headers.filter((colState) => colState.display);
        return records.map((record, index) => {
          const rowObj = { ...record, data: pick(record.data, keys) };
          return (
            <JIYCellRow
              primaryField={headers.find((header) => header.primary)}
              path={path}
              record={rowObj}
              setRecords={setRecords}
              key={index}
            />
          );
        });
      } else {
        return (
          <Table.Row>
            <Table.Cell colSpan={headers.length + 1}>Data Not Found</Table.Cell>
          </Table.Row>
        );
      }
    } else {
      return (
        <Table.Row>
          <Table.Cell colSpan={headers.length + 1}>
            Unknown Table Schema
          </Table.Cell>
        </Table.Row>
      );
    }
  }, [records]);

  const handleHorizontalScrolling = useCallback(
    (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }

      const x = e.pageX - draggableWrapperRef.current?.offsetLeft;
      const scroll = x - startX;
      draggableWrapperRef.current.scrollLeft = scrollLeft - scroll;
    },
    [mouseDown]
  );

  const startDragging = useCallback((e) => {
    setMouseDown(true);
    setStartX(e.pageX - draggableWrapperRef.current?.offsetLeft);
    setScrollLeft(draggableWrapperRef.current?.scrollLeft);
  }, []);

  const stopDragging = useCallback((e) => {
    setMouseDown(false);
  }, []);

  return (
    <Grid padded>
      <Grid.Column>
        <Grid padded>
          <JIYTableCustomHead
            title={title}
            search={search}
            isLoading={isLoading}
            setSearch={setSearch}
            setLoading={setLoading}
          />
          <Grid.Row>
            <JIYTableTools
              title={title}
              path={path}
              prev={prev}
              next={next}
              total={total}
              page={page}
              pageSize={pageSize}
              query={query}
              search={search}
              ordering={ordering}
              headers={headers}
              records={records}
              isLoading={isLoading}
              setPage={setPage}
              setPageSize={setPageSize}
              setQuery={setQuery}
              setSearch={setSearch}
              setOrdering={setOrdering}
              setHeaders={setHeaders}
              setRecords={setRecords}
              setLoading={setLoading}
            />
          </Grid.Row>
          {!isLoading && (
            <Ref innerRef={draggableWrapperRef}>
              <Grid.Row
                className="ebs-table-draggable-wrapper"
                onMouseMove={handleHorizontalScrolling}
                onMouseUp={stopDragging}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
              >
                <Table
                  className={`${
                    mouseDown
                      ? "ebs-table-draggable-inner-grabbing"
                      : "ebs-table-draggable-inner"
                  }`}
                  singleLine
                  sortable
                  celled
                  collapsing
                  striped
                  size="small"
                >
                  <JIYTableHeader
                    headers={headers}
                    ordering={ordering}
                    setHeaders={setHeaders}
                    setOrdering={setOrdering}
                  />
                  <Table.Body>{getCellRows()}</Table.Body>
                </Table>
              </Grid.Row>
            </Ref>
          )}
        </Grid>
      </Grid.Column>
    </Grid>
  );
}

export default JIYTable;
