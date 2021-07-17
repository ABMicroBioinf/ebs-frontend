/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-16 16:41:56
 * @modify date 2021-07-16 16:41:56
 * @desc [description]
 */
import { Dispatch, SetStateAction } from "react";

/**
 * EBSTabularHeader
 */
interface EBSTabularHeader {
  name: string;
  value: string;
  alias: string;
  type: string;
  display: boolean;
  primary: boolean;
  children: Array<EBSTabularHeader>;
}

/**
 * EBSTabularRecord
 */
interface EBSTabularRecord {
  index: number;
  data: object;
  isSelected: boolean;
}

/**
 * EBSTabularData
 */
interface EBSTabularData {
  title: string;
  headers: Array<EBSTabularHeader>;
  records: Array<EBSTabularRecord>;
}

/**
 * EBSTabularDataContext
 */
interface EBSTabularDataContext {
  ebsTabularData: EBSTabularData;
  setEBSTabularData: Dispatch<SetStateAction<EBSTabularData>>;
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
interface EBSTableStateChainInterface {
  chainQueue: Array<"columns" | "search" | "sort">;
  search: string;
  columns: Array<EBSTabularHeader>;
  sort: EBSSortContext;
  pagination: EBSPaginationContext;
}

/**
 * EBSTableStateInterface
 */
interface EBSTableStateInterface {
  title: string;
  headers: Array<EBSTabularHeader>;
  records: Array<EBSTabularRecord>;
  stateChain: EBSTableStateChainInterface;
  readonly HEADERS_ORIGIN_REF: Array<EBSTabularHeader>;
  readonly RECORDS_ORIGIN_REF: Array<EBSTabularRecord>;
}

/**
 * EBSTableStateContext
 */
interface EBSTableStateContext {
  ebsTableState: EBSTableStateInterface;
  setEBSTableState: Dispatch<EBSTableAction>;
}

/**
 * EBSTableDashboardStateContext
 */
interface EBSTableDashboardStateContext extends EBSTableStateContext {
  wideView: boolean;
  setWideView: Dispatch<SetStateAction<boolean>>;
}

/**
 * EBSTableAction (A Type of Reducer Action)
 * RESET_DATA
 * SELECT_ALL_DATA
 * DESELECT_ALL_DATA
 * SET_COLUMNS
 * SORT_DATA
 * SEARCH_DATA
 * PAGINATE_DATA
 */
type EBSTableAction =
  | {
      type:
        | "RESET_DATA"
        | "SELECT_ALL_DATA"
        | "DESELECT_ALL_DATA"
        | "APPLY_STATE_CHAIN";
    }
  | {
      type: "SET_SELECTION";
      record: EBSTabularRecord;
    }
  | {
      type: "SET_STATE_CHAIN";
      module: "columns" | "search" | "sort";
      columnsColumn: string;
      sortDataType: "string" | "number";
      sortColumn?: string;
      sortDirection?: "asc" | "desc";
      search: string;
      page: number;
      pageSize: number;
    };

export type {
  EBSTabularHeader,
  EBSTabularRecord,
  EBSTabularData,
  EBSTabularDataContext,
  EBSSortContext,
  EBSPaginationContext,
  EBSTableStateChainInterface,
  EBSTableStateInterface,
  EBSTableStateContext,
  EBSTableDashboardStateContext,
  EBSTableAction,
};
