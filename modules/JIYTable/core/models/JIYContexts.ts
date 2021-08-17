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

export interface JIYHeaderContext {
  parent: string;
  name: string;
  value: string;
  alias: string;
  display: boolean;
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
  record: JIYRecordContext<T>;
  setRecords: Dispatch<SetStateAction<Array<JIYRecordContext<T>>>>;
}

export interface JIYTableHeaderContext {
  headers: Array<JIYHeaderContext>;
  ordering: JIYOrderingContext;
  setHeaders: Dispatch<SetStateAction<Array<JIYHeaderContext>>>;
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

// export type ArrayedData = Array<Record<string, unknown>>;

// /**
//  * EBSTabularHeaderContext
//  */
// export interface EBSTabularHeaderContext {
//   name: string;
//   value: string;
//   alias: string;
//   display: boolean;
//   primary: boolean;
// }

// /**
//  * EBSTabularRecordContext
//  */
// export interface EBSTabularRecordContext {
//   index: number;
//   data: object;
//   isSelected: boolean;
// }

// /**
//  * EBSTabularDataContext
//  */
// export interface EBSTabularDataContext {
//   title: string;
//   placementURI: string;
//   headers: Array<EBSTabularHeaderContext>;
//   records: Array<EBSTabularRecordContext>;
// }

// /**
//  * EBSTabularDataContext
//  */
// export interface EBSTabularDataStateContext {
//   ebsTabularData: EBSTabularDataContext;
//   setEBSTabularData: Dispatch<SetStateAction<EBSTabularDataContext>>;
// }

// /**
//  * EBSSearchContext
//  */
// export interface EBSSearchContext {
//   keyword: string;
// }

// /**
//  * EBSSortContext
//  */
// export interface EBSSortContext {
//   column?: string;
//   direction?: "asc" | "desc";
//   dataType: "string" | "number";
// }

// /**
//  * EBSPaginationContext
//  */
// export interface EBSPaginationContext {
//   page: number;
//   pageSize: number;
//   pageCount: number;
// }

// /**
//  * EBSTableStateChainContext
//  */
// export interface EBSTableStateChainContext {
//   chainQueue: Array<"search" | "sort" | "columns">;
//   search: EBSSearchContext;
//   sort: EBSSortContext;
//   pagination: EBSPaginationContext;
// }

// /**
//  * EBSTableStateContext
//  */
// export interface EBSTableStateContext {
//   title: string;
//   placementURI: string;
//   stateChain: EBSTableStateChainContext;
//   headers: Array<EBSTabularHeaderContext>;
//   records: Array<EBSTabularRecordContext>;
//   HEADERS_STATE_REF: Array<EBSTabularHeaderContext>;
//   RECORDS_STATE_REF: Array<EBSTabularRecordContext>;
// }

// /**
//  * EBSTableInstanceStateContext
//  */
// export interface EBSTableInstanceStateContext {
//   ebsTableState: EBSTableStateContext;
//   setEBSTableState: Dispatch<EBSTableActionContext>;
// }

// /**
//  * EBSTableRecordContext
//  */
// export interface EBSTableRecordContext {
//   primary: EBSTabularHeaderContext;
//   record: EBSTabularRecordContext;
//   placementURI: string;
//   setEBSTableState: Dispatch<EBSTableActionContext>;
// }

// /**
//  * EBSTableDashboardStateContext
//  */
// export interface EBSTableDashboardStateContext
//   extends EBSTableInstanceStateContext {
//   wideView: boolean;
//   setWideView: Dispatch<SetStateAction<boolean>>;
// }

// /**
//  * EBSTableActionContext (A Type of Reducer Action)
//  */
// export type EBSTableActionContext =
//   | {
//       type: "RESET_DATA" | "SELECT_ALL_RECORDS" | "DESELECT_ALL_RECORDS";
//     }
//   | { type: "TOGGLE_HEADER"; header: string }
//   | {
//       type: "SELECT_RECORD";
//       record: EBSTabularRecordContext;
//     }
//   | { type: "SEARCH_KEYWORD"; keyword: string }
//   | {
//       type: "TOGGLE_SORT";
//       sortColumn: string;
//       sortDataType: "string" | "number";
//       sortDirection?: "asc" | "desc";
//     }
//   | {
//       type: "SET_PAGE";
//       page: number;
//     }
//   | {
//       type: "SET_PAGESIZE";
//       page: number;
//       pageSize: number;
//     };
