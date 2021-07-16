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
 * EBSTableStateChainContext
 */
interface EBSTableStateChain {
  order: Array<string>;
  search: string;
  columns: Array<EBSTabularHeader>;
  sort: {
    column: string;
    direction: string;
    dataType: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

/**
 * EBSTableState
 */
interface EBSTableState {
  HEADERS_ORIGIN_REF: Array<EBSTabularHeader>;
  RECORDS_ORIGIN_REF: Array<EBSTabularRecord>;
  headers: Array<EBSTabularHeader>;
  records: Array<EBSTabularRecord>;
  stateChain: EBSTableStateChain;
}

/**
 * EBSTableStateContext
 */
interface EBSTableStateContext {
  ebsTableState: EBSTableState;
  setEBSTableState: Dispatch<SetStateAction<EBSTableState>>;
}

/**
 * EBSSortContext
 */
interface EBSSortContext {
  column: string;
  direction: string;
  dataType: string;
}

export type {
  EBSTabularHeader,
  EBSTabularRecord,
  EBSTabularData,
  EBSTabularDataContext,
  EBSTableStateChain,
  EBSTableState,
  EBSTableStateContext,
  EBSSortContext,
};
