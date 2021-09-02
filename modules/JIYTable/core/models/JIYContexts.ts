/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:41:56
 * @modify date 2021-07-16 16:41:56
 * @desc [description]
 */

import { Dispatch, SetStateAction } from "react";

export interface JIYURLContext {
  api: string;
  uri: string;
  url: string;
}

export type JIYHeaderDisplay = "visible" | "hidden" | "none";

export interface JIYHeaderContext {
  name: string;
  value: string;
  alias: string;
  display: JIYHeaderDisplay;
  primary: boolean;
}

export interface JIYRecordContext<T> {
  isSelected: boolean;
  data: T;
}

export interface JIYTabularDataContext<T> {
  headers: Array<JIYHeaderContext>;
  records: Array<JIYRecordContext<T>>;
}

export interface JIYTableStateContext<T> {
  title: string;
  path: string;
  prev: string;
  next: string;
  total: number;
  page: number;
  pageSize: number;
  query: string;
  search: string;
  ordering: JIYOrderingContext;
  headers: Array<JIYHeaderContext>;
  records: Array<JIYRecordContext<T>>;
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setOrdering: Dispatch<SetStateAction<JIYOrderingContext>>;
  setHeaders: Dispatch<SetStateAction<Array<JIYHeaderContext>>>;
  setRecords: Dispatch<SetStateAction<Array<JIYRecordContext<T>>>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface JIYCellRowContext<T> {
  primaryField: JIYHeaderContext;
  path: string;
  headers: Array<JIYHeaderContext>;
  records: Array<JIYRecordContext<T>>;
  record: JIYRecordContext<T>;
  index: number;
  setRecords: Dispatch<SetStateAction<Array<JIYRecordContext<T>>>>;
}

export interface JIYCellHeadingContext<T> {
  record: JIYRecordContext<T>;
  records: Array<JIYRecordContext<T>>;
  index: number;
  setRecords: Dispatch<SetStateAction<Array<JIYRecordContext<T>>>>;
}

export interface JIYTableHeaderContext<T> {
  headers: Array<JIYHeaderContext>;
  records: Array<JIYRecordContext<T>>;
  ordering: JIYOrderingContext;
  setHeaders: Dispatch<SetStateAction<Array<JIYHeaderContext>>>;
  setRecords: Dispatch<SetStateAction<Array<JIYRecordContext<T>>>>;
  setOrdering: Dispatch<SetStateAction<JIYOrderingContext>>;
}

export interface JIYTableStandaloneContext<T> {
  title: string;
  url: JIYURLContext;
  path: string;
  module: string;
  handler: (x: Array<T>) => JIYTabularDataContext<T>;
}

export interface JIYTableStandaloneVizViewContext {
  module: string;
}

export interface JIYOrderingContext {
  column?: string;
  direction?: "ascending" | "descending";
}

export interface VizViewContext {
  module: string;
  query: string;
  wideView: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  setWideView: Dispatch<SetStateAction<boolean>>;
}
