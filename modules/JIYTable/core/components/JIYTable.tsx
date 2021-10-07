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
import JIYTableTools from "./JIYTableTools";
import JIYTableCustomHead from "../plugins/JIYTableCustomHead";
import { pick } from "../libs/gizmos";

/**
 * JIYTable
 * A top level table component layouts entire structure of data table
 * @param param0 - See {@link JIYTableStateContext}
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
  isSelectedAll,
  selectedItems,
  setPage,
  setPageSize,
  setQuery,
  setSearch,
  setOrdering,
  setHeaders,
  setRecords,
  setLoading,
  setSelectedAll,
  setSelectedItems,
}: JIYTableStateContext<T>): JSX.Element {
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const [headerOnTop, setHeaderOnTop] = useState(false);

  const draggableWrapperRef = useRef(null);
  const stickyNodeMountPointRef = useRef(null);
  const tableHeaderObserver = useRef<IntersectionObserver>();
  const options = {
    root: null,
    rootMargin: "-160px 0px 0px 0px",
    threshold: 0,
  };
  const stickyTableHeaderRef = useCallback(
    (node: HTMLElement | null) => {
      if (tableHeaderObserver.current) tableHeaderObserver.current.disconnect();
      tableHeaderObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add("ebs-table-header");
        }
      }, options);
      if (node) tableHeaderObserver.current.observe(node);
    },
    [headerOnTop]
  );

  const getCellRows = useCallback(() => {
    if (headers.length > 0) {
      if (records.length > 0) {
        const keys = headers.filter((colState) => colState.display !== "none");
        return records.map((record, index) => {
          const rowObj = { ...record, data: pick(record.data, keys) };
          return (
            <JIYCellRow
              primaryField={headers.find((header) => header.primary)}
              path={path}
              isSelectedAll={isSelectedAll}
              selectedItems={selectedItems}
              headers={headers}
              records={records}
              record={rowObj}
              index={index}
              setRecords={setRecords}
              setSelectedAll={setSelectedAll}
              setSelectedItems={setSelectedItems}
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
  }, [records, isSelectedAll]);

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
        <div ref={stickyNodeMountPointRef}>
          <Grid padded>
            <Grid.Row>
              <JIYTableCustomHead
                title={title}
                search={search}
                isLoading={isLoading}
                setSearch={setSearch}
                setLoading={setLoading}
              />
            </Grid.Row>
            <Sticky
              className="ebs-sticky-node"
              offset={40}
              context={stickyNodeMountPointRef}
              onStick={() => {
                setHeaderOnTop(true);
              }}
              onUnstick={() => {
                setHeaderOnTop(false);
              }}
            >
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
                  isSelectedAll={isSelectedAll}
                  selectedItems={selectedItems}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  setQuery={setQuery}
                  setSearch={setSearch}
                  setOrdering={setOrdering}
                  setHeaders={setHeaders}
                  setRecords={setRecords}
                  setLoading={setLoading}
                  setSelectedAll={setSelectedAll}
                  setSelectedItems={setSelectedItems}
                />
              </Grid.Row>
            </Sticky>
            {!isLoading && (
              <Ref innerRef={draggableWrapperRef}>
                <Grid.Row
                  className="ebs-table-draggable-wrapper ebs-header-anchor"
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
                    <Ref innerRef={stickyTableHeaderRef}>
                      <JIYTableHeader
                        headers={headers}
                        records={records}
                        ordering={ordering}
                        isSelectedAll={isSelectedAll}
                        selectedItems={selectedItems}
                        setHeaders={setHeaders}
                        setRecords={setRecords}
                        setOrdering={setOrdering}
                        setSelectedAll={setSelectedAll}
                        setSelectedItems={setSelectedItems}
                      />
                    </Ref>
                    <Table.Body>{getCellRows()}</Table.Body>
                  </Table>
                </Grid.Row>
              </Ref>
            )}
          </Grid>
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default JIYTable;
