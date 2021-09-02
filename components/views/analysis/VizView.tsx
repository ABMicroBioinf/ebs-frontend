/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:20:13
 * @modify date 2021-07-15 13:20:19
 * @desc [description]
 */

import React from "react";

import { JIYTableStateContext } from "../../../modules/JIYTable/core/models/JIYContexts";
import JIYTable from "../../../modules/JIYTable/core/components/JIYTable";

/**
 * IsolateVizView
 * @param param0 - See {@link JIYTableStateContext}
 * @returns - Isolate Visualization View Component
 */
function IsolatesVizView<T>({
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
  return (
    <>
      <JIYTable
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
    </>
  );
}

export default IsolatesVizView;
