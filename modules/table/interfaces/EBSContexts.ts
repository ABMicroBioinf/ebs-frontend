/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:41:56
 * @modify date 2021-07-16 16:41:56
 * @desc [description]
 */
import { Dispatch, SetStateAction } from "react";

/**
 * EBSTabularHeaderContext
 */
interface EBSTabularHeaderContext {
  name: string;
  value: string;
  alias: string;
  type: "string" | "number";
  display: boolean;
  primary: boolean;
  children: Array<EBSTabularHeaderContext>;
}

/**
 * EBSTabularRecordContext
 */
interface EBSTabularRecordContext {
  index: number;
  data: object;
  isSelected: boolean;
}

/**
 * EBSTabularDataContext
 */
interface EBSTabularDataContext {
  title: string;
  placementURI: string;
  headers: Array<EBSTabularHeaderContext>;
  records: Array<EBSTabularRecordContext>;
}

/**
 * EBSTabularDataContext
 */
interface EBSTabularDataStateContext {
  ebsTabularData: EBSTabularDataContext;
  setEBSTabularData: Dispatch<SetStateAction<EBSTabularDataContext>>;
}

/**
 * EBSSearchContext
 */
interface EBSSearchContext {
  keyword: string;
}

/**
 * EBSSortContext
 */
interface EBSSortContext {
  column?: string;
  direction?: "asc" | "desc";
  dataType: "string" | "number";
}

/**
 * EBSPaginationContext
 */
interface EBSPaginationContext {
  page: number;
  pageSize: number;
  pageCount: number;
}

/**
 * EBSTableStateChainContext
 */
interface EBSTableStateChainContext {
  chainQueue: Array<"search" | "sort" | "columns">;
  search: EBSSearchContext;
  sort: EBSSortContext;
  pagination: EBSPaginationContext;
}

/**
 * EBSTableStateContext
 */
interface EBSTableStateContext {
  title: string;
  placementURI: string;
  stateChain: EBSTableStateChainContext;
  headers: Array<EBSTabularHeaderContext>;
  records: Array<EBSTabularRecordContext>;
  HEADERS_STATE_REF: Array<EBSTabularHeaderContext>;
  RECORDS_STATE_REF: Array<EBSTabularRecordContext>;
}

/**
 * EBSTableInstanceStateContext
 */
interface EBSTableInstanceStateContext {
  ebsTableState: EBSTableStateContext;
  setEBSTableState: Dispatch<EBSTableActionContext>;
}

/**
 * EBSTableRecordContext
 */
interface EBSTableRecordContext {
  primary: EBSTabularHeaderContext;
  record: EBSTabularRecordContext;
  placementURI: string;
  setEBSTableState: Dispatch<EBSTableActionContext>;
}

/**
 * EBSTableDashboardStateContext
 */
interface EBSTableDashboardStateContext extends EBSTableInstanceStateContext {
  wideView: boolean;
  setWideView: Dispatch<SetStateAction<boolean>>;
}

/**
 * EBSTableActionContext (A Type of Reducer Action)
 */
type EBSTableActionContext =
  | {
      type: "RESET_DATA" | "SELECT_ALL_RECORDS" | "DESELECT_ALL_RECORDS";
    }
  | { type: "TOGGLE_HEADER"; header: string }
  | {
      type: "SELECT_RECORD";
      record: EBSTabularRecordContext;
    }
  | { type: "SEARCH_KEYWORD"; keyword: string }
  | {
      type: "TOGGLE_SORT";
      sortColumn: string;
      sortDataType: "string" | "number";
      sortDirection?: "asc" | "desc";
    }
  | {
      type: "SET_PAGE";
      page: number;
    }
  | {
      type: "SET_PAGESIZE";
      page: number;
      pageSize: number;
    };

export type {
  EBSTabularHeaderContext,
  EBSTabularRecordContext,
  EBSTabularDataContext,
  EBSTabularDataStateContext,
  EBSSortContext,
  EBSPaginationContext,
  EBSTableStateChainContext,
  EBSTableStateContext,
  EBSTableInstanceStateContext,
  EBSTableRecordContext,
  EBSTableDashboardStateContext,
  EBSTableActionContext,
};
